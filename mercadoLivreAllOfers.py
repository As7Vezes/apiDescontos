from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
import requests

def getAllProducts():
    print("Iniciando a obtenção de produtos...")
    products = []

    options = Options()
    options.add_argument('--headless')

    browser = webdriver.Chrome(options=options)

    print("Acessando o site do Mercado Livre...")
    browser.get("https://www.mercadolivre.com.br/ofertas#nav-header")
    
    page_content = browser.page_source

    print("Extraindo informações das ofertas...")
    site = BeautifulSoup(page_content, "html.parser")

    items_container = site.findAll("li", attrs={"class": "promotion-item"})

    for item in items_container:
        img_tag = item.find("img")
        src_value = img_tag['src']
        
        price = item.find("span", attrs={"class": "andes-money-amount"}).text
        
        description = item.find("p", attrs={"class": "promotion-item__title"}).text
        
        products.append({"description": description, "price": price, "src": src_value})

    print("Produtos obtidos com sucesso!")
    return products

# Obtém os produtos
products = getAllProducts()

# Envia os produtos para o servidor Node.js
try:
    print("Enviando dados para o servidor Node.js...")
    response = requests.post('http://localhost:3000/receberDados', json=products)
    if response.status_code == 200:
        print("Dados enviados com sucesso para o servidor Node.js")
    else:
        print("Erro ao enviar dados para o servidor Node.js:", response.text)
except Exception as e:
    print("Erro ao enviar dados para o servidor Node.js:", e)
