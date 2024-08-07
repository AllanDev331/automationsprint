const { Builder, By, Key, until } = require('selenium-webdriver');
require('chromedriver');

(async function Autoamacao() {
    // Configuração do WebDriver (o path é automaticamente resolvido pelo chromedriver)
    let driver = await new Builder().forBrowser('chrome').build();
    try {

        // 1. Abrir a URL Actuar
        await driver.get('https://app.actuar.com/#/common/login');
        let email = "allan.nunes@actuar.com";
        let senha = "Actuar1508@";
         
        let elementok = await driver.wait(until.elementLocated(By.className('btn btn-primary ladda-button')), 50000);
        await driver.wait(until.elementIsVisible(elementok), 50000);
           await elementok.click();
    
                 // 2. inserir o Email no campo Email
        
        let insertEmail = driver.wait(until.elementLocated(By.xpath('//*[@id="Email"]/section/div/input')), 3000);
        await driver.wait(until.elementIsVisible(insertEmail), 30000);
        await insertEmail.sendKeys(email);
        
        // 3. inserir a senha no campo senha

        let elementosenha = await driver.wait(until.elementLocated(By.xpath('//*[@id="Password"]/section/div/input')), 3000);
        await driver.wait(until.elementIsVisible(elementosenha), 30000)
        await elementosenha.sendKeys(senha);
        
        //clicar em enter para acessar

        let elementToClick = await driver.findElement(By.className('ladda-button actuar'));
        await elementToClick.click()

        //clicar em escopo Actuar
        let elementActuar = await driver.wait(until.elementLocated(By.id('e370daff-5407-4844-9440-89fcba96105c')), 30000);
        await driver.wait(until.elementIsVisible(elementActuar), 30000);
        await elementActuar.click()

        // clicar na lupa de pesquisa 

        let elementlupa = await driver.wait(until.elementLocated(By.xpath('//*[@id="core"]/main/app-navbar/div/div[2]/div[2]/div[1]')), 30000);
        await driver.wait(until.elementIsVisible(elementlupa), 30000);
        await elementlupa.click()

        // Inseri ID na pesquisa

        let elementpesquisa = await driver.wait(until.elementLocated(By.xpath('//*[@id="core"]/main/app-navbar/div/app-busca-pessoa/div/div[2]/div/form/div/input')), 30000);
        await driver.wait(until.elementIsVisible(elementpesquisa), 30000);
        await elementpesquisa.sendKeys('DN0000')

        // Clicarno perfil do aluno 

        let elementVerPerfil = await driver.wait(until.elementLocated(By.className('btn-ver-perfil')), 30000);
        await driver.wait(until.elementIsVisible(elementVerPerfil), 30000)
        await elementVerPerfil.click()

        // retirar data atual
        let dataAtual = new Date();
        console.log(dataAtual)
        // retirar data de 2 dias atrás
        let Data2DiasAtras = new Date();
        Data2DiasAtras.setDate(Data2DiasAtras.getDate() - 2)

        //Transformar data de login em formato Date
        async function ObterDataElemento() {
            let DataDoElemento = await driver.wait(until.elementLocated(By.xpath('//*[@id="core"]/main/mat-sidenav-container/mat-sidenav-content/div/div/app-clientes-module/app-perfil-cliente/div/div/div/app-perfil-cliente-header/div/section/div[2]/div/div/div[1]/div/div[2]/div/p')), 30000);
            await driver.wait(until.elementIsVisible(DataDoElemento), 30000);
            let LerData = await DataDoElemento.getText();
            return new Date(LerData);
        }

        //Obter Data de login do cliente
        let ElementoDataLogin = By.xpath('//*[@id="core"]/main/mat-sidenav-container/mat-sidenav-content/div/div/app-clientes-module/app-perfil-cliente/div/div/div/app-perfil-cliente-header/div/section/div[2]/div/div/div[1]/div/div[2]/div/p');
        let DataDologin = await ObterDataElemento(ElementoDataLogin)
        console.log(DataDologin)
        
        // Abrir Contas a Receber
        let ContasReceber = await driver.wait(until.elementLocated(By.xpath('//*[@id="financeiro-perfil"]/div[1]/i')), 30000)
        await driver.wait(until.elementIsVisible(ContasReceber), 30000)
        await ContasReceber.click()

        //  Clicar em Atualizar
        let ClickAtualizar = await driver.wait(until.elementLocated(By.xpath('//*[@id="financeiro-perfil"]/div[2]/div/app-efetuar-novo-recebimento/app-dxgrid/app-grouped/section/div[2]/div[1]/div/div[2]/div/button')), 30000);
        await driver.wait(until.elementIsVisible(ClickAtualizar), 30000)
        await ClickAtualizar.click();
        
        //Função para transformar em number
        async function TransformarEmNumber (){
            let ElementoValorAberto = await driver.wait(until.elementLocated(By.xpath('//*[@id="financeiro-perfil"]/div[2]/div/app-efetuar-novo-recebimento/app-dxgrid/app-grouped/section/div[2]/div[2]/div[1]/div[4]/p')), 30000);
            await driver.wait(until.elementIsVisible(ElementoValorAberto), 30000);
            let ObterNumeroElemento = await ElementoValorAberto.getText();
            console.log(ObterNumeroElemento);

            let ObterNumeroElemento = ElementoValorAberto.replace("R$", "").replace(/\./g, "").replace(",", ".");
            let Numeric = parseFloat(ObterNumeroElemento);
            return Numeric
        }

        let ObterNumeroElemento = await TransformarEmNumber();
        console.log(ObterNumeroElemento)

        if(DataDologin = dataAtual){
            await driver.executeScript(`alert('Cliente ta logando');`);
        } else if(DataDologin >= Data2DiasAtras){
            await driver.executeScript(`alert('cliente está logando ${DataDologin}');`);
        }else{
            await driver.executeScript(`alert('Deu erro saporra');`);
        }


        // 10. Exibir uma mensagem no log (console)
              await driver.wait(new Promise(resolve => setTimeout(resolve, 30000)));
            } finally {
                // Finalizar a sessão do navegador
            }
        })();
