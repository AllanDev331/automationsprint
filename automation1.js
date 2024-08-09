const { Builder, By, Key, until } = require('selenium-webdriver');
require('chromedriver');

(async function Autoamacao() {
    // Configuração do WebDriver (o path é automaticamente resolvido pelo chromedriver)
    let driver = await new Builder().forBrowser('chrome').build();
    try {

        // 1. Abrir a URL Actuar
        await driver.get('https://app.actuar.com/#/common/login');
        let email = "guilherme.morais@actuar.com";
        let senha = "Actuar.062";
        let IDcliente = "AP1378" 
        let idEntrarACT = '6364f105-ae2c-4522-a722-e19483af4ece'
        //let MeuNome = "Allan Raphael"

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
        let elementActuar = await driver.wait(until.elementLocated(By.id(idEntrarACT)), 30000);
        await driver.wait(until.elementIsVisible(elementActuar), 30000);
        await elementActuar.click()

        // clicar na lupa de pesquisa 

        let elementlupa = await driver.wait(until.elementLocated(By.xpath('//*[@id="core"]/main/app-navbar/div/div[2]/div[2]/div[1]')), 30000);
        await driver.wait(until.elementIsVisible(elementlupa), 30000);
        await elementlupa.click()

        // Inseri ID na pesquisa

        let elementpesquisa = await driver.wait(until.elementLocated(By.xpath('//*[@id="core"]/main/app-navbar/div/app-busca-pessoa/div/div[2]/div/form/div/input')), 30000);
        await driver.wait(until.elementIsVisible(elementpesquisa), 30000);
        await elementpesquisa.sendKeys(IDcliente)

        // Clicarno perfil do aluno 

        let elementVerPerfil = await driver.wait(until.elementLocated(By.className('btn-ver-perfil')), 30000);
        await driver.wait(until.elementIsVisible(elementVerPerfil), 30000)
        await elementVerPerfil.click()

        // retirar data atual
        let dataAtual = new Date();
        console.log(dataAtual)

        // retirar data de 2 dias atrás
        let Data3DiasAtras = new Date();
        Data3DiasAtras.setDate(Data3DiasAtras.getDate() - 3)
        console.log(Data3DiasAtras)

        // 30 dias cliente de cancelamento
        let Data30DiasAtras = new Date();
        Data30DiasAtras.setDate(Data30DiasAtras.getDate() - 30)
        console.log(Data30DiasAtras)

        //7 retirar data á 7 dias 
        let Data7DiasAtras = new Date();
        Data30DiasAtras.setDate(Data7DiasAtras.getDate() - 7)
        console.log(Data7DiasAtras)

        //5 meses atrás 
        let Meses5Atras = new Date();
        Meses5Atras.setDate(Meses5Atras.getDate() - 150)
        console.log(Meses5Atras)

        //Obter Data de login do cliente
        function converterStringParaData(dataString) {
            // Separar a parte da data da parte da hora
               let [dataParte, horaParte] = dataString.split(' ');
            // Separar o dia, mês e ano
                let [dia, mes, ano] = dataParte.split('/');
            // Separar a hora e minutos
                let [hora, minutos] = horaParte.split(':');
            // Criar um novo objeto Date no formato correto
            let dataFormatada = new Date(`${ano}-${mes}-${dia}T${hora}:${minutos}:00`);

            return dataFormatada;
        }

        let ElementoDataLogin = await driver.wait(until.elementLocated(By.xpath('//*[@id="core"]/main/mat-sidenav-container/mat-sidenav-content/div/div/app-clientes-module/app-perfil-cliente/div/div/div/app-perfil-cliente-header/div/section/div[2]/div/div/div[1]/div/div[2]/div/p')), 30000);
        await driver.wait(until.elementIsVisible(ElementoDataLogin), 30000);
        let ObterDataElemento = await ElementoDataLogin.getText();
        console.log(ObterDataElemento);

        if (typeof ObterDataElemento === 'string') {
            console.log("O valor é uma string.");
        }
        
        let DataLogin = converterStringParaData(ObterDataElemento);
        console.log(DataLogin)
    
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

            let refatorar = ObterNumeroElemento.replace("R$", "").replace(/\./g, "").replace(",", ".");
            let Numeric = parseFloat(refatorar);
            return Numeric
        }

        let ValorAberto = await TransformarEmNumber();
        console.log(ValorAberto)
        
        let Sprint = 'Sprint 31'
        
        async function clickComentarios (){
            let comentarios = await driver.wait(until.elementLocated(By.xpath('//*[@id="comentaros-perfil"]/div[1]')), 30000);
            await driver.wait(until.elementIsVisible(comentarios), 30000)
            await comentarios.click()
            
            let ComentsAntigos = await driver.wait(until.elementLocated(By.xpath('//*[@id="comentaros-perfil"]/div[2]/div/ul/li[2]/section')), 30000);
            await driver.wait(until.elementIsVisible(ComentsAntigos), 30000)

            let NovoComentario = await driver.wait(until.elementLocated(By.xpath('//*[@id="comentaros-perfil"]/div[2]/div/div/div[1]/button')), 30000);
            await driver.wait(until.elementIsVisible(NovoComentario), 30000)
            await NovoComentario.click()

            let Descricao = await driver.wait(until.elementLocated(By.xpath('//*[@id="modal-comentario"]/div/div/form/div[2]/div/div[1]/input')), 30000);
            await driver.wait(until.elementIsVisible(Descricao), 30000)
            await Descricao.sendKeys(Sprint)
        }

        async function ClicarEmConcluir() {
            let BotaoSave = await driver.wait(until.elementLocated(By.xpath('//*[@id="modal-comentario"]/div/div/form/div[3]/button[2]')), 30000);
            await driver.wait(until.elementIsVisible(BotaoSave), 30000)
            await BotaoSave.click()     
        }
        

        // LOGICA DOS COMENTÁRIOS -0---------------------------------0-----
        if(DataLogin.getTime() >= Data3DiasAtras.getTime() && ValorAberto === 0){  //Data do login maior ou = 3 dias atrás e valor aberto = a 0
           
            await clickComentarios();
            let Conteudo = await driver.wait(until.elementLocated(By.xpath('//*[@id="modal-comentario"]/div/div/form/div[2]/div/div[2]/textarea')), 30000);
            await driver.wait(until.elementIsVisible(Conteudo), 30000)
            await Conteudo.sendKeys(`Último Login: ${ObterDataElemento}\nValor Aberto: R$${ValorAberto}\nPague.lá: Não tem.\nObs: Cliente vigente e logando normalmente.\nMensagem Ativa Enviada \nTicket#:`);
            await ClicarEmConcluir()

        }else if(DataLogin.getTime() >= Data3DiasAtras.getTime() && ValorAberto > 0){ //Data do login maior ou = 3 dias atrás e valor aberto maior que 0

            await clickComentarios();
            let Conteudo = await driver.wait(until.elementLocated(By.xpath('//*[@id="modal-comentario"]/div/div/form/div[2]/div/div[2]/textarea')), 30000);
            await driver.wait(until.elementIsVisible(Conteudo), 30000)
            await Conteudo.sendKeys(`Último Login: ${ObterDataElemento}\nValor Aberto: R$${ValorAberto}\nPague.lá: Não tem.\nObs: Cliente com valor em aberto e logando, enviado mensagem ativa para cobrança.\nMensagem Ativa Enviada \nTicket#:`);
            await ClicarEmConcluir()

        }else if(DataLogin.getTime() > Data7DiasAtras.getTime() && DataLogin.getTime() < Data3DiasAtras.getTime() && ValorAberto > 0){ //Data do login menor que 3 dias atrás e valor aberto maior que 0
            
            await clickComentarios();
            let Conteudo = await driver.wait(until.elementLocated(By.xpath('//*[@id="modal-comentario"]/div/div/form/div[2]/div/div[2]/textarea')), 30000);
            await driver.wait(until.elementIsVisible(Conteudo), 30000)
            await Conteudo.sendKeys(`Último Login: ${ObterDataElemento}\nValor Aberto: R$${ValorAberto}\nPague.lá: Não tem.\nObs: Cliente com valor em aberto e logando, enviado mensagem ativa para cobrança.\nMensagem Ativa Enviada \nTicket#:`);
            await ClicarEmConcluir()

        }else if(DataLogin.getTime() > Data7DiasAtras.getTime() && DataLogin.getTime() <= Data3DiasAtras.getTime() && ValorAberto === 0){ //Data do login menor que 3 dias atrás e valor em aberto igual a 0
            
             await clickComentarios();
             let Conteudo = await driver.wait(until.elementLocated(By.xpath('//*[@id="modal-comentario"]/div/div/form/div[2]/div/div[2]/textarea')), 30000);
             await driver.wait(until.elementIsVisible(Conteudo), 30000)
             await Conteudo.sendKeys(`Último Login: ${ObterDataElemento}\nValor Aberto: R$${ValorAberto}\nPague.lá: Não tem.\nObs: Cliente vigente porém não logando, enviado mensagem ativa para entender o motivo de não estar logando.\nMensagem Ativa Enviada \nTicket#:`);
             await ClicarEmConcluir()

        }else if( DataLogin.getTime() < Data30DiasAtras.getTime() && ValorAberto > 0 && DataLogin.getTime() > Meses5Atras){ //Data do login menor ou = 30 dias atrás e valor em aberto maior que 1
            
            await clickComentarios(); 
            let Conteudo = await driver.wait(until.elementLocated(By.xpath('//*[@id="modal-comentario"]/div/div/form/div[2]/div/div[2]/textarea')), 30000);
             await driver.wait(until.elementIsVisible(Conteudo), 30000)
             await Conteudo.sendKeys(`Último Login: ${ObterDataElemento}\nValor Aberto: R$${ValorAberto}\nPague.lá: Não tem.\nObs:Cliente será cadastrado em cancelamento em progresso e será cobrado o valor em aberto .\nMensagem Ativa Enviada \nTicket#:`);
             await ClicarEmConcluir()

        }else if(DataLogin.getTime() < Data30DiasAtras.getTime() && ValorAberto === 0){ //Data do login menor ou = 30 dias atrás e valor em aberto === a 0

            await clickComentarios(); 
            let Conteudo = await driver.wait(until.elementLocated(By.xpath('//*[@id="modal-comentario"]/div/div/form/div[2]/div/div[2]/textarea')), 30000);
             await driver.wait(until.elementIsVisible(Conteudo), 30000)
             await Conteudo.sendKeys(`Último Login: ${ObterDataElemento}\nValor Aberto: R$${ValorAberto}\nPague.lá: Não tem.\nObs:Cliente será cadastrado em cancelamento em progresso e está sem valor em aberto .\nMensagem Ativa Enviada \nTicket#:`);
             await ClicarEmConcluir()
            
        }else if( DataLogin.getTime() < Data7DiasAtras.getTime() && DataLogin.getTime() > Data30DiasAtras.getTime() && ValorAberto === 0){ //Data do login maior que 30 dias atrás e menor que 7 dias atras e valor em aberto === a 0

            await clickComentarios(); 
            let Conteudo = await driver.wait(until.elementLocated(By.xpath('//*[@id="modal-comentario"]/div/div/form/div[2]/div/div[2]/textarea')), 30000);
             await driver.wait(until.elementIsVisible(Conteudo), 30000)
             await Conteudo.sendKeys(`Último Login: ${ObterDataElemento}\nValor Aberto: R$${ValorAberto}\nPague.lá: Não tem.\nObs:Cliente passível de cancelamento, mais de 7 dias sem logar no sistema.\nMensagem Ativa Enviada \nTicket#:`);
             await ClicarEmConcluir()

        }else if(DataLogin.getTime() < Data7DiasAtras.getTime() && Data7DiasAtras.getTime() > Data30DiasAtras.getTime()  && ValorAberto > 0){ //Data do login maior que 30 dias atrás e menor que 7 dias atras e valor em aberto maior que 0

            await clickComentarios(); 
            let Conteudo = await driver.wait(until.elementLocated(By.xpath('//*[@id="modal-comentario"]/div/div/form/div[2]/div/div[2]/textarea')), 30000);
             await driver.wait(until.elementIsVisible(Conteudo), 30000)
             await Conteudo.sendKeys(`Último Login: ${ObterDataElemento}\nValor Aberto: R$${ValorAberto}\nPague.lá: Não tem.\nObs:Cliente passível de cancelamento, mais de 7 dias sem logar no sistema.\nMensagem Ativa Enviada \nTicket#:`);
             await ClicarEmConcluir()
        }
        else {
            await driver.executeScript(`alert('deu certo não');`); 
        }

        // Localizar e obter o nome do cliente
        let NomeClienteElement = await driver.wait(until.elementLocated(By.className('page-title ng-star-inserted')), 40000);
        await driver.wait(until.elementIsVisible(NomeClienteElement), 40000);
        let NomeCliente = await NomeClienteElement.getText();
        console.log("Nome do Cliente:", NomeCliente);

        // Localizar e obter o número do cliente (um único número via XPath específico)
        let NumeroClienteElement = await driver.wait(until.elementLocated(By.xpath('//*[@id="core"]/main/mat-sidenav-container/mat-sidenav-content/div/div/app-clientes-module/app-perfil-cliente/div/div/div/app-perfil-cliente-header/div/section/div[1]/div[2]/div[2]/div/div[3]/div/p/span/a')), 40000);
        await driver.wait(until.elementIsVisible(NumeroClienteElement), 40000);
        let NumeroCliente = await NumeroClienteElement.getText();
        console.log("Número do Cliente (via XPath):", NumeroCliente);

        // Localizar o container que contém os números de telefone
        let containerTelefones = await driver.findElement(By.xpath('//*[@class="item ng-star-inserted"]'));

        // Encontrar todos os elementos <a> (números de telefone) dentro do container
        let telefones = await containerTelefones.findElements(By.css('a'));

        console.log("Quantidade de números de telefone encontrados:", telefones.length);

        // Inicializar uma variável para armazenar todos os números de telefone concatenados
        let todosTelefones = "";

        // Iterar sobre cada número de telefone encontrado
        for (let telefone of telefones) {
            let textoTelefone = await telefone.getText();
            console.log("Número de telefone encontrado:", textoTelefone); // Exibir cada número de telefone encontrado
            todosTelefones += textoTelefone + " "; // Concatenar os números de telefone
        }

        console.log("Todos os Números de Telefone:", todosTelefones.trim());

        // Combinar os números de telefone capturados e o nome do cliente em uma única mensagem
        let MensagemAtiva = NomeCliente + " " + NumeroCliente + " " + todosTelefones.trim();
        console.log("Texto completo:", MensagemAtiva);

        // Copiar a mensagem completa para a área de transferência
        await driver.executeScript(`navigator.clipboard.writeText(${JSON.stringify(MensagemAtiva)});`);

        // Esperar um pouco para garantir que o texto seja copiado
        await driver.sleep(2000); // Aguarda 2 segundos

        // await driver.get('https://account.blip.ai/login?ReturnUrl=%2Fconnect%2Fauthorize%2Fcallback%3Fclient_id%3Dblip-desk%26redirect_uri%3Dhttps%253A%252F%252Factuar.desk.blip.ai%252Fauthorize%26response_type%3Did_token%2520token%26scope%3Dopenid%2520profile%2520email%26state%3D421c3997ddc74f549909ec292e51e60e%26nonce%3D75197e8cea4048b399649c9a196a6ffa'); 
    
                 // 1. inserir o Email no campo Email Blip
        
        // let insertEmailBlip = driver.wait(until.elementLocated(By.id('email')), 30000);
        // await driver.wait(until.elementIsVisible(insertEmailBlip), 30000);
        // await insertEmailBlip.sendKeys(email);

        // let insertSenhalBlip = driver.wait(until.elementLocated(By.id('password')), 30000);
        // await driver.wait(until.elementIsVisible(insertSenhalBlip), 30000);
        // await insertSenhalBlip.sendKeys(senha);

        // let elementCok = await driver.wait(until.elementLocated(By.id('onetrust-accept-btn-handler')), 50000);
        // await driver.wait(until.elementIsVisible(elementCok), 50000);
        //    await elementCok.click();

        // let ElementEntrar = await driver.wait(until.elementLocated(By.id('blip-login')), 50000);
        // await driver.wait(until.elementIsVisible(ElementEntrar), 50000);
        // await ElementEntrar.click();

        // let ElementAtivar = await driver.wait(until.elementLocated(By.className('button button__primary button--size-standard')), 50000);
        // await driver.wait(until.elementIsVisible(ElementAtivar), 50000);
        // await ElementAtivar.click();

        // await driver.sleep(4000);


        // let MensagemAtivaClick = await driver.wait(until.elementLocated(By.xpath('//*[@id="sidenav-div"]/div[2]/div/div[2]/bds-button[2]//button')), 50000);
        // await driver.wait(until.elementIsVisible(MensagemAtivaClick), 50000);
        // await MensagemAtivaClick.click();

        // await driver.sleep(4000);

        // let Favoritos = await driver.wait(until.elementLocated(By.className('slider slider--size-short round slider--deselected')), 50000);
        // await driver.wait(until.elementIsVisible(Favoritos), 50000);
        // await Favoritos.click();

        // await driver.sleep(4000);


        // let RetornoContato = await driver.wait(until.elementLocated(By.xpath('//*[@id="selectable-template-scroll"]/bds-radio-group/div/div[1]/div[1]/bds-radio//label/div/div[3]')), 50000);
        // await driver.wait(until.elementIsVisible(RetornoContato), 50000);
        // await RetornoContato.click();

        // let Continuar = await driver.wait(until.elementLocated(By.xpath('//*[@id="send-active-message"]/div[2]/div[3]/div[2]/bds-button//button')), 50000);
        // await driver.wait(until.elementIsVisible(Continuar), 50000);
        // await Continuar.click();

        // let NovoContato = await driver.wait(until.elementLocated(By.xpath('//*[@id="send-active-message"]/div[2]/div[2]/div/div/div[2]/bds-radio-group/bds-radio[2]//label/div/div[3]')), 50000);
        // await driver.wait(until.elementIsVisible(NovoContato), 50000);
        // await NovoContato.click();;

        // let insertTelefone = driver.wait(until.elementLocated(By.className('input__container__text sc-bds-input-phone-number')), 3000);
        // await driver.wait(until.elementIsVisible(insertTelefone), 30000);
        // await insertTelefone.sendKeys(NumeroCliente);

        // let insertName = driver.wait(until.elementLocated(By.className('input__container__text')), 3000);
        // await driver.wait(until.elementIsVisible(insertName), 30000);
        // await insertName.sendKeys(NomeCliente);

        // let Contine = await driver.wait(until.elementLocated(By.xpath('//*[@id="send-active-message"]/div[2]/div[2]/div/div/div[2]/bds-radio-group/bds-radio[2]//label/div/div[3]')), 50000);
        // await driver.wait(until.elementIsVisible(Contine), 50000);
        // await Contine.click();;

        // let ColocarNome = driver.wait(until.elementLocated(By.xpath('//*[@id="input-1"]/span')), 3000);
        // await driver.wait(until.elementIsVisible(ColocarNome), 30000);
        // await ColocarNome.sendKeys(NomeCliente);

        // let ColocarMeuNome = driver.wait(until.elementLocated(By.xpath('//*[@id="input-3"]/span')), 3000);
        // await driver.wait(until.elementIsVisible(ColocarMeuNome), 30000);
        // await ColocarMeuNome.sendKeys(MeuNome);

        // let Enviar = await driver.wait(until.elementLocated(By.className('loading-button mt2 bp-btn bp-btn--true a-m-forward-btn self-end send-button')), 50000);
        // await driver.wait(until.elementIsVisible(Enviar), 50000);
        // await Enviar.click();;
        
    }catch(err) {
        console.log(err);996
    }
     finally {
        // Finalizar a sessão do navegador, se necessário
        await driver.wait(new Promise(resolve => setTimeout(resolve, 30000)));
        // await driver.quit();
    }
})();
