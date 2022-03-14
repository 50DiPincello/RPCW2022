var axios = require('axios');
var url = require('url');
var http = require('http');

function getAlunos(){
    return axios.get('http://localhost:3000/alunos')
    .then(function (resp){
        return resp.data;
    })
    .catch(function(error) {
        console.log(error);
    });
}

function getCursos(){
    return axios.get('http://localhost:3000/cursos')
    .then(function (resp){
        return resp.data;
    })
    .catch(function(error) {
        console.log(error);
    });
}

function getInstrumentos(){
    return axios.get('http://localhost:3000/instrumentos')
    .then(function (resp){
        return resp.data;
    })
    .catch(function(error) {
        console.log(error);
    });
}

function getAluno(id){
    return axios.get('http://localhost:3000/alunos/' + id)
    .then(function (resp){
        return resp.data;
    })
    .catch(function(error) {
        console.log(error);
    });
}

function geraPaginaInicial(){
    return (`
    
    <!DOCTYPE html>
    <html>
        <head>
            
            <title>Página inicial</title>
            <meta charset="utf-8">

            <style type="text/css">
			
			body {
				font:  16px Arial, Helvetica, sans-serif;
                background-color : #A9A9A9
			}

            a {
                text-decoration: none;
            }

            #caixa {
                font-family: "Arial Black", Gadget, sans-serif;
                font-size: 10px;
                color: #34344E;
            }

            #agradece {
                font-weight: bold;
                text-align: center;
                font-family: "Arial Black", Gadget, sans-serif;
            }

		</style>


        </head>
        <body>
            
            <div id = "caixa">
                <span>
                    <a href="index.html">HOME</a>
                </span>
                &nbsp;|&nbsp;
                <span>
                    <a href=\"http://localhost:4000/alunos\">ALUNOS</a>
                </span>
                &nbsp;|&nbsp;
                <span>
                    <a href=\"http://localhost:4000/cursos\">CURSOS</a>
                </span>
                &nbsp;|&nbsp;
                <span>
                    <a href=\"http://localhost:4000/instrumentos\">INSTRUMENTOS</a>
                </span>
            </div>
            <br>
            <div id = "agradece">
                Bom som! 
            </div>
            
            
        </body>
    </html>
    `)
}

function geraPagina(res,type){
    if(type == "Alunos"){
        var selectedKeys = ['Id', 'Nome', 'Curso', 'Instrumento']
    } else if (type == "Cursos"){
        var selectedKeys = ['Id', 'Designação', 'Duração', 'Instrumento_ID', 'Instrumento']
    } else if (type == "Instrumentos"){
        var selectedKeys = ['Id', 'Instrumento']
    }
    var page = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8">
            <title>Escola - ${type}</title>
            <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
        </head>
        <body class="w3-container" style="background-color: rgb(30, 117, 74);">
            <p class="w3-text-blue"><a href="http://localhost:4000/">Voltar</a></p>
            <h1 class="w3-center" style="color: white;">Tabela de ${type}</h1>
            <table class="w3-table-all w3-centered w3-hoverable w3-margin-top">
    `
    // Table head
    page += `
    <thead>
        <tr class="w3-light-grey">
    `
    for (let i = 0; i < selectedKeys.length; i++){
        page += '<th>' + selectedKeys[i] + '</th>\n'
    }
    page += '</tr></thead>'


    if(type == "Alunos"){
        getAlunos()
            .then(alunos => {
            // Table rows for each student
            alunos.forEach( a => {
                page += '<tr>'
                page += '<td>' + a.id + `</td><td><a href="http://localhost:4000/alunos/${a.id}">` + a.nome + '</a></td><td>' + a.curso + '</td><td>' + a.instrumento + '</td>'
                page += '</tr>\n'
            });
            // Final html
            page += '</table>\n</body>\n</html>'
            res.write(page)
            res.end()
        });    
    } else if (type == "Cursos"){
        getCursos()
            .then(cursos => {
            // Table rows for each student
            cursos.forEach( c => {
                page += '<tr>'
                page += '<td>' + c.id + '</td><td>' + c.designacao + '</td><td>' + c.duracao + '</td><td>' + c.instrumento.id + '</td><td>' + c.instrumento.text + '</td>'
                page += '</tr>\n'
            });
            // Final html
            page += '</table>\n</body>\n</html>'
            res.write(page)
            res.end()
        });
    } else if (type == "Instrumentos"){
        getInstrumentos()
            .then(instrumentos => {
            // Table rows for each student
            instrumentos.forEach( i => {
                page += '<tr>'
                page += '<td>' + i.id + '</td><td>' + i.text + '</td>'
                page += '</tr>\n'
            });
            // Final html
            page += '</table>\n</body>\n</html>'
            res.write(page)
            res.end()
        });
    }
}

function geraPaginaAluno(res,al){
    getAluno(al)
            .then(aluno => {

                page += `<p style="font-size: 18px; color: green">Nome: ${aluno.nome}<br>
                         ID: ${aluno.id}<br>
                         Data de Nascimento: ${aluno.dataNasc}<br>
                         Curso: ${aluno.curso}<br>
                         Ano do Curso: ${aluno.anoCurso}<br>
                         Instrumento: ${aluno.instrumento}</p>`

            page += '</body>\n</html>'
            res.write(`
            <!DOCTYPE html>
            <html>
                <head>
                    <meta charset="UTF-8">
                    <title>Alunos - ${al}</title>

                    body {
                        font:  16px Arial, Helvetica, sans-serif;
                        background-color : #A9A9A9
                    }
        
                    a {
                        text-decoration: none;
                    }
                
                </head>
                <body style="background-color: #A9A9A9">
                    <p><a href="http://localhost:4000/alunos">Voltar</a></p>
                `)
            res.end()
        });
}



server = http.createServer(function(req,res){
    var d = new Date().toISOString().substring(0,16)
    console.log(req.method + " " + req.url + " " + d)
    var myurl = url.parse(req.url,true)

    if (myurl.pathname == '/'){
        res.writeHead(200,{'Content-Type':'text/html'})
        console.log("Pagina inicial")
        res.write(geraPaginaInicial())
        res.end()
    } else if(myurl.pathname == "/alunos"){
        res.writeHead(200,{'Content-Type':'text/html'})
        console.log("Página de alunos")
        geraPagina(res,"Alunos")
    } else if(myurl.pathname == "/cursos"){
        res.writeHead(200,{'Content-Type':'text/html'})
        console.log("Página dos cursos")
        geraPagina(res,"Cursos")
    } else if(myurl.pathname == "/instrumentos"){
        res.writeHead(200,{'Content-Type':'text/html'})
        console.log("Página dos instrumentos")
        geraPagina(res,"Instrumentos")
    } else if(myurl.pathname.includes("/alunos/")){
        res.writeHead(200,{'Content-Type': 'text/html'})
        console.log("Página de aluno especifico")
        geraPaginaAluno(res,myurl.pathname.split("/")[2])
    } else {
        res.writeHead(200,{'Content-Type':'text/html'})
        res.end("<p> Rota não suportada:" + req.url + "</p>")
    }
})

server.listen(4000);

console.log("Servidor à escuta na porta 4000");