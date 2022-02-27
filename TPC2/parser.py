import json



f = open('cinemaATP.json',encoding='utf-8')

data = json.loads(f.read())

filmes = {}
atores = {}

filmeId=1
atorId=1
for movie in data:
    filmes[movie['title']] = {
        'atores' : set(x for x in movie['cast']),
        'ano' : movie['year'],
        'genero' : set(x for x in movie['genres']),
        'id' : filmeId
    }
    filmeId+=1

    for ator in movie['cast']:
        if ator not in atores:
            atores[ator] = {
                'filmes' : [],
                'id': atorId
            }
            atores[ator]['filmes'].append(movie['title'])
            atorId+=1
        else:
            atores[ator]['filmes'].append(movie['title'])

filmes = dict(sorted(filmes.items(), key = lambda x : x[0]))
atores = dict(sorted(atores.items(), key = lambda x : x[0]))

def createHomePage():
    page_path = "./html/index.html"
    header = """
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
            <title>RPCW22 TPC2 - Movies&Actors</title>
        </head>
        <body bgcolor="#FAFAFA">
            <div class="w3-bar w3-green">
                <a class="active" href="http://localhost:7777/">Home</a>
                <a href="http://localhost:7777/atores">Atores</a>
                <a href="http://localhost:7777/filmes">Filmes</a>
            </div>
    """  
    footer = """        
            <footer>
                RPCW22 TPC2 - Movies&Actors
            </footer>
        </body>
    </html>"""

    f = open(page_path,'w')
    content = header + footer
    f.write(content)
    f.close()

def createMainMoviesPage():

    header = """
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
        <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
        <title>RPCW22 TPC2 - Movies&Actors</title>
    </head>
    <body bgcolor="#FAFAFA">
        <div class="w3-bar w3-green">
            <a href="http://localhost:7777/">Home</a>
            <a href="http://localhost:7777/atores">Atores</a>
            <a class="active" href="http://localhost:7777/filmes">Filmes</a>
        </div>"""        
    footer = """        
        <footer>
            RPCW22 TPC2 - Movies&Actors
        </footer>
    </body>
</html>"""

    page_path = "./html/filmes.html"
    f = open(page_path,'w')
    content = header
    content += """
        <div class="w3-container">
            <ul class="w3-ul">
    """
    for movie,values in filmes.items():
        content += f"\t\t\t\t<li><a href=\"http://localhost:7777/filmes/f{values['id']}\">{movie}</a></li>\n"

    
    content += """
            </ul>
        </div>
    """
    content += footer
    f.write(content)

def createMainActorsPage():

    header = """
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
        <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
        <title>RPCW22 TPC2 - Movies&Actors</title>
    </head>
    <body bgcolor="#FAFAFA">
        <div class="w3-bar w3-green">
            <a href="http://localhost:7777/">Home</a>
            <a class="active" href="http://localhost:7777/atores">Atores</a>
            <a href="http://localhost:7777/filmes">Filmes</a>
        </div>"""        
    footer = """        
        <footer>
            RPCW22 TPC2 - Movies&Actors
        </footer>
    </body>
</html>"""

    page_path = "./html/atores.html"
    f = open(page_path,'w',encoding='utf-8')
    content = header
    content += """
        <div class="w3-container">
            <ul class="w3-ul">
    """
    
    for ator,values in atores.items():
        content += f"\t\t\t\t<li><a href=\"http://localhost:7777/atores/a{values['id']}\">{ator}</a></li>\n"
    
    content += """
            </ul>
        </div>
    """
    content += footer
    f.write(content)

def createEachActorPage():
    header = """
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
        <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
        <title>RPCW22 TPC2 - Movies&Actors</title>
    </head>
    <body bgcolor="#FAFAFA">
        <div class="w3-bar w3-green">
            <a href="http://localhost:7777/">Home</a>
            <a class="active" href="http://localhost:7777/atores">Atores</a>
            <a href="http://localhost:7777/filmes">Filmes</a>
        </div>"""        
    footer = """        
        <footer>
            RPCW22 TPC2 - Movies&Actors
        </footer>
    </body>
</html>"""

    for ator,values in atores.items():
        content = header
        page_path = f"./html/a{values['id']}.html"
        f = open(page_path,'w',encoding='utf-8')
        actor_page = f"""
        <div class="w3-container">
            <h1>{ator}</h1>
            <h2>Filmes Nos Quais Participou:</h2>
            <ul class="w3-ul">
"""
        for filme in values['filmes']:
            actor_page += f"""
                <li><a href=\"http://localhost:7777/filmes/f{filmes[filme]['id']}\">{filme}</a></li>
"""
        content += actor_page
        content += """
            </ul>
        </div>
"""
        content += footer
        f.write(content)
        f.close()

def createEachMoviePage():
    header = """
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
        <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
        <title>RPCW22 TPC2 - Movies&Actors</title>
    </head>
    <body bgcolor="#FAFAFA">
        <div class="w3-bar w3-green">
            <a href="http://localhost:7777/">Home</a>
            <a class="active" href="http://localhost:7777/atores">Atores</a>
            <a href="http://localhost:7777/filmes">Filmes</a>
        </div>"""        
    footer = """        
        <footer>
            RPCW22 TPC2 - Movies&Actors
        </footer>
    </body>
</html>"""

    for filme,values in filmes.items():
        content = header
        page_path = f"./html/f{values['id']}.html"
        f = open(page_path,'w',encoding='utf-8')
        filme_page = f"""
        <div class="w3-container">
            <h1>{filme}</h1>
            <h2>Year: {values['ano']}</h2>
            <h2>Genres: {','.join(x for x in values['genero'])}</h2>
            <h2>Atores Participantes:</h2>
            <ul class="w3-ul">
"""
        for ator in values['atores']:
            filme_page += f"""
                <li><a href=\"http://localhost:7777/filmes/a{atores[ator]['id']}\">{ator}</a></li>
"""
        content += filme_page
        content += """
            </ul>
        </div>
"""
        content += footer
        f.write(content)
        f.close()

createHomePage()
createMainMoviesPage()
createMainActorsPage()
createEachActorPage()
createEachMoviePage()