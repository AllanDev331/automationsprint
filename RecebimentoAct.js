const { Builder, By, Key, until } = require('selenium-webdriver'); // Certifique-se de que o Builder foi importado        

(async function BlipAuto() {
   // Configuração do WebDriver (o path é automaticamente resolvido pelo chromedriver)
   let WebDriver = await new Builder().forBrowser('chrome').build();
   try {
      // Realizar Login
       await WebDriver.get('https://app.actuar.com/#/common/login');
       
       let email = "allan.nunes@actuar.com";
       let senha = "Actuar1508@";
       let idEntrarACT = 'e370daff-5407-4844-9440-89fcba96105c'
       let Squad = "One"
       //let MeuNome = "Allan Raphael"

       let elementok = await WebDriver.wait(until.elementLocated(By.className('btn btn-primary ladda-button')), 50000);
       await WebDriver.wait(until.elementIsVisible(elementok), 50000);
          await elementok.click();
   
                // 2. inserir o Email no campo Email
       let insertEmail = WebDriver.wait(until.elementLocated(By.xpath('//*[@id="Email"]/section/div/input')), 3000);
       await WebDriver.wait(until.elementIsVisible(insertEmail), 30000);
       await insertEmail.sendKeys(email);
       
       let elementosenha = await WebDriver.wait(until.elementLocated(By.xpath('//*[@id="Password"]/section/div/input')), 3000);
       await WebDriver.wait(until.elementIsVisible(elementosenha), 30000)
       await elementosenha.sendKeys(senha);

       let elementToClick = await WebDriver.findElement(By.className('ladda-button actuar'));
       await elementToClick.click()
      
       let elementActuar = await WebDriver.wait(until.elementLocated(By.id(idEntrarACT)), 30000);
       await WebDriver.wait(until.elementIsVisible(elementActuar), 30000);
       await elementActuar.click()
       //Login Finalizado                                                               ------

       await WebDriver.executeScript("window.open('about:blank', '_blank');");

       // Obter as guias abertas
       let tabs = await WebDriver.getAllWindowHandles();

       // Mudar para a nova guia
       await WebDriver.switchTo().window(tabs[1]);

       // Navegar para a nova URL na nova guia
       await WebDriver.get('https://app.actuar.com/#/financeiro/contas-receber');
      // reduzir zoom 
       await WebDriver.executeScript("document.body.style.zoom='50%'");
      
       let SquadOne = await WebDriver.wait(until.elementLocated(By.xpath('//*[@id="gridContainer"]/div/div[5]/div/table/tbody/tr[2]/td[18]/div/div[2]/div/div/div[1]/input')), 30000);
       await WebDriver.wait(until.elementIsVisible(SquadOne), 30000);
       await SquadOne.sendKeys(Squad)
       console.log('Squad inserido')

       await WebDriver.executeScript("document.body.style.zoom='100%'");

       let Engrenagem = await WebDriver.wait(until.elementLocated(By.xpath('//*[@id="core"]/main/app-navbar/div/div[2]/div[1]/app-botoes-pagina/div/app-botoes-acoes-itens[2]/div/button')), 30000);
       await WebDriver.wait(until.elementIsVisible(Engrenagem), 30000);
       await Engrenagem.click()

       let EscolherColuna  = await WebDriver.wait(until.elementLocated(By.xpath('//*[@id="core"]/main/app-navbar/div/div[2]/div[1]/app-botoes-pagina/div/app-botoes-acoes-itens[2]/div/div/span[2]')), 30000);
       await WebDriver.wait(until.elementIsVisible(EscolherColuna ), 30000);
       await EscolherColuna .click()
      // INSERIR TELEFONES
      let Telefones  = await WebDriver.wait(until.elementLocated(By.xpath('//*[@id="modalEscolhaColunas"]/div/div/div[2]/div[3]/app-checkbox/label/span')), 30000);
      await WebDriver.wait(until.elementIsVisible(Telefones ), 30000);
      await Telefones .click()

      let Okcol  = await WebDriver.wait(until.elementLocated(By.xpath('//*[@id="modalEscolhaColunas"]/div/div/div[3]/div/button[1]')), 30000);
       await WebDriver.wait(until.elementIsVisible(Okcol ), 30000);
       await Okcol .click()

      console.log('Deu aqui')
       let linhas = await WebDriver.findElements(By.xpath('//tr[contains(@role, "row")]'));

       // Sequência para copiar número e telefone dos clientes
       for (let i = 1; i <= linhas.length; i++) {
         // Ajustar os XPaths para corresponder aos novos atributos
         let xpathTelefone = `//tr[contains(@role, 'row')][${i}]/td[@aria-describedby="dx-col-653"]`;
         let xpathNomeCliente = `//tr[contains(@role, 'row')][${i}]/td[@aria-describedby="dx-col-655"]`;
     console.log(linhas)
         try {
             // Copiar o conteúdo dos elementos <td> da linha atual
             let telefoneElemento = await WebDriver.findElement(By.xpath(xpathTelefone));
             let nomeClienteElemento = await WebDriver.findElement(By.xpath(xpathNomeCliente));
     
             let textoTelefone = await telefoneElemento.getText();
             let textoNomeCliente = await nomeClienteElemento.getText();
     
             console.log(`Linha ${i} - Telefone: ${textoTelefone}`);
             console.log(`Linha ${i} - Nome do Cliente: ${textoNomeCliente}`);
     
             // Copiar os textos para a área de transferência (ou realizar outra ação)
             await WebDriver.executeScript(`navigator.clipboard.writeText(${JSON.stringify(textoTelefone + " " + textoNomeCliente)});`);
             
             // Realizar alguma operação intermediária aqui, se necessário
             await WebDriver.sleep(4000); // Pausa de 4 segundos antes de continuar para a próxima linha
     
         } catch (err) {
             console.error(`Erro ao processar a linha ${i}:`, err);
         }
     }

}catch(err) {
   console.log(err);996
}
finally {
   // Finalizar a sessão do navegador, se necessário
   await WebDriver.wait(new Promise(resolve => setTimeout(resolve, 30000)));
   // await driver.quit();
}
})();

// Opcional: Finalizar o processo, por exemplo, fechando o navegador  
     /* await driver.get('https://account.blip.ai/login?ReturnUrl=%2Fconnect%2Fauthorize%2Fcallback%3Fclient_id%3Dblip-desk%26redirect_uri%3Dhttps%253A%252F%252Factuar.desk.blip.ai%252Fauthorize%26response_type%3Did_token%2520token%26scope%3Dopenid%2520profile%2520email%26state%3D421c3997ddc74f549909ec292e51e60e%26nonce%3D75197e8cea4048b399649c9a196a6ffa'); 
    
        //1. inserir o Email no campo Email Blip
        
         let insertEmailBlip = driver.wait(until.elementLocated(By.id('email')), 30000);
         await driver.wait(until.elementIsVisible(insertEmailBlip), 30000);
         await insertEmailBlip.sendKeys(email);

         let insertSenhalBlip = driver.wait(until.elementLocated(By.id('password')), 30000);
         await driver.wait(until.elementIsVisible(insertSenhalBlip), 30000);
         await insertSenhalBlip.sendKeys(senha);

         let elementCok = await driver.wait(until.elementLocated(By.id('onetrust-accept-btn-handler')), 50000);
         await driver.wait(until.elementIsVisible(elementCok), 50000);
            await elementCok.click();

         let ElementEntrar = await driver.wait(until.elementLocated(By.id('blip-login')), 50000);
         await driver.wait(until.elementIsVisible(ElementEntrar), 50000);
         await ElementEntrar.click();

         let ElementAtivar = await driver.wait(until.elementLocated(By.className('button button__primary button--size-standard')), 50000);
         await driver.wait(until.elementIsVisible(ElementAtivar), 50000);
         await ElementAtivar.click();

         await driver.sleep(4000);


         let MensagemAtivaClick = await driver.wait(until.elementLocated(By.xpath('//*[@id="sidenav-div"]/div[2]/div/div[2]/bds-button[2]//button')), 50000);
         await driver.wait(until.elementIsVisible(MensagemAtivaClick), 50000);
         await MensagemAtivaClick.click();

         await driver.sleep(4000);

         let Favoritos = await driver.wait(until.elementLocated(By.className('slider slider--size-short round                  slider--deselected')), 50000);
         await driver.wait(until.elementIsVisible(Favoritos), 50000);
         await Favoritos.click();

        await driver.sleep(4000);


         let RetornoContato = await driver.wait(until.elementLocated(By.xpath('//*[@id="selectable-template-scroll"]/bds-radio-group/div/div[1]/div[1]/bds-radio//label/div/div[3]')), 50000);
         await driver.wait(until.elementIsVisible(RetornoContato), 50000);
         await RetornoContato.click();

         let Continuar = await driver.wait(until.elementLocated(By.xpath('//*[@id="send-active-message"]/div[2]/div[3]/div[2]/bds-button//button')), 50000);
         await driver.wait(until.elementIsVisible(Continuar), 50000);
         await Continuar.click();

         let NovoContato = await driver.wait(until.elementLocated(By.xpath('//*[@id="send-active-message"]/div[2]/div[2]/div/div/div[2]/bds-radio-group/bds-radio[2]//label/div/div[3]')), 50000);
         await driver.wait(until.elementIsVisible(NovoContato), 50000);
         await NovoContato.click();;

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
        // await Enviar.click();;#*/

