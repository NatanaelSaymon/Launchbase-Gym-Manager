const Member = require('../models/Member')
const { age, date } = require('../../lib/utils')

module.exports = {
  index(req, res){
    Member.all(function(members){
      return res.render('members/index', { members })
    })
  },
  create(req, res){
    Member.instructorSelectOptions(function(options){
      return res.render('members/create', { instructorOptions: options })
    })
  },
  post(req, res){
    const keys = Object.keys(req.body)
    for(key of keys){
      if(req.body[key] == ""){
        return res.send("Por favor, preencha todos os campos!")
      }
    }
    Member.create(req.body, function(member){
      res.redirect(`/members/${member.id}`)
    })
    
  },
  show(req, res){
    Member.find(req.params.id, function(member){
      if(!member){
        return res.send("Membro não encontrado, tente novamente!")
      }

      member.birth = date(member.birth).birthDay

      return res.render("members/show", { member })
    })
  },
  edit(req, res){
    Member.find(req.params.id, function(member){
      if(!member){
        return res.send("Membro não encontrado, tente novamente!")
      }

      member.birth = date(member.birth).iso
      return res.render("members/edit", { member })
    })
  },
  put(req, res){
    const keys = Object.keys(req.body)
    for(key of keys){
      if(req.body[key] == ""){
        return res.send("Por favor, preencha todos os campos!")
      }
    }

    Member.update(req.body, function(){
      return res.redirect(`/members/${req.body.id}`)
    })
  },
  delete(req, res){
    Member.delete(req.body.id, function(){
      return res.redirect("/members")
    })
  }
}