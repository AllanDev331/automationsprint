const { Builder, By, until } = require('selenium-webdriver');
require('chromedriver');

(async function BlipAuto() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        // Realizar Login
        await driver.get('https://app.actuar.com/#/common/login');
       
        let email = "allan.nunes@actuar.com";
        let senha = "Actuar1508@";
        let idEntrarACT = 'e370daff-5407-4844-9440-89fcba96105c';

        let elementok = await driver.wait(until.elementLocated(By.className('btn btn-primary ladda-button')), 50000);
        await driver.wait(until.elementIsVisible(elementok), 50000);
        await elementok.click();

        // Inserir Email
        let insertEmail = await driver.wait(until.elementLocated(By.xpath('//*[@id="Email"]/section/div/input')), 30000);
        await driver.wait(until.elementIsVisible(insertEmail), 30000);
        await insertEmail.sendKeys(email);
        
        // Inserir Senha
        let elementosenha = await driver.wait(until.elementLocated(By.xpath('//*[@id="Password"]/section/div/input')), 30000);
        await driver.wait(until.elementIsVisible(elementosenha), 30000);
        await elementosenha.sendKeys(senha);

        let elementToClick = await driver.findElement(By.className('ladda-button actuar'));
        await elementToClick.click();

        let elementActuar = await driver.wait(until.elementLocated(By.id(idEntrarACT)), 30000);
        await driver.wait(until.elementIsVisible(elementActuar), 30000);
        await elementActuar.click();

        // Abrir nova aba para "Contas a Receber"
        await driver.executeScript("window.open('about:blank', '_blank');");
        let abas = await driver.getAllWindowHandles();

        // Mudar para a aba "Contas a Receber"
        await driver.switchTo().window(abas[1]);
        await driver.get('https://app.actuar.com/#/financeiro/contas-receber');

        // Operações na aba "Contas a Receber"
        let Engrenagem = await driver.wait(until.elementLocated(By.xpath('//*[@id="core"]/main/app-navbar/div/div[2]/div[1]/app-botoes-pagina/div/app-botoes-acoes-itens/div')), 30000);
        await driver.wait(until.elementIsVisible(Engrenagem), 40000);
        await Engrenagem.click();

        await driver.sleep(2000);

        let EscolherCol = await driver.wait(until.elementLocated(By.xpath('//*[@id="core"]/main/app-navbar/div/div[2]/div[1]/app-botoes-pagina/div/app-botoes-acoes-itens/div/div/span[2]')), 30000);
        await driver.wait(until.elementIsVisible(EscolherCol), 40000);
        await EscolherCol.click();

        await driver.sleep(2000);
        //Ajustando colunas
        let Telefones = await driver.wait(until.elementLocated(By.xpath('//*[@id="modalEscolhaColunas"]/div/div/div[2]/div[3]/app-checkbox/label/span')), 30000);
        await driver.wait(until.elementIsVisible(Telefones), 40000);
        await Telefones.click();
        console.log('Clicou no telefones');

        await driver.sleep(1000);

        let OkCol = await driver.wait(until.elementLocated(By.xpath('//*[@id="modalEscolhaColunas"]/div/div/div[3]/div/button[1]')), 30000);
        await driver.wait(until.elementIsVisible(OkCol), 40000);
        await OkCol.click();

        await driver.sleep(1000);

        let AssCampo = await driver.wait(until.elementLocated(By.xpath('//*[@id="gridContainer"]/div/div[5]/div/table/tbody/tr[2]/td[4]/div/div[2]/div/div/div[1]/input')), 30000);
        await driver.wait(until.elementIsVisible(AssCampo), 40000);
        await AssCampo.sendKeys('Ass');

        await driver.sleep(2000);

        let scrollBar = await driver.findElement(By.css('.dx-scrollable-scrollbar.dx-scrollbar-horizontal'));

        // Role para a direita
        await driver.executeScript('arguments[0].scrollLeft = arguments[1];', scrollBar, 510); // 510 é a posição final que você forneceu

        // Aguarde o carregamento do conteúdo após rolar para a direita
        await driver.wait(until.elementLocated(By.xpath('//div[@id="conteudo-especifico"]')), 30000);

        // Role para a esquerda
        await driver.executeScript('arguments[0].scrollLeft = 0;', scrollBar);

        // Aguarde o carregamento do conteúdo após rolar para a esquerda
        await driver.wait(until.elementLocated(By.xpath('//div[@id="conteudo-especifico"]')), 30000);

        console.log('Conteúdo carregado após rolar para direita e esquerda');

       console.log ('aqui até agora foi') 

        let Squad = await driver.wait(until.elementLocated(By.xpath('gridContainer"]/div/div[5]/div/table/tbody/tr[2]/td[4]/div/div[2]/div/div/div[1]/input')), 30000);
        await driver.wait(until.elementIsVisible(Squad), 40000);
        await Squad.sendKeys('One');
        
        await driver.sleep(2000);

        let linhas50 = await driver.wait(until.elementLocated(By.xpath('//*[@id="gridContainer"]/div/div[11]/div[1]/div[3]')), 30000);
        await driver.wait(until.elementIsVisible(linhas50), 40000);
        await linhas50.click();
        
        await driver.sleep(3000);
        
        // Lógica de cópia e colagem
        let linhas = await driver.findElements(By.xpath('//tr[contains(@role, "row")]'));
        console.log('chegamos até aqui');
        
        for (let i = 1; i <= linhas.length; i++) {
            // XPaths para telefone e nome do cliente
            let xpathTelefone = //tr[contains(@role, 'row')][${i}]/td[@aria-describedby="dx-col-653"];
            let xpathNomeCliente = //tr[contains(@role, 'row')][${i}]/td[@aria-describedby="dx-col-655"];

            try {
                // Encontrando os elementos
                let telefoneElemento = await driver.findElement(By.xpath(xpathTelefone));
                let nomeClienteElemento = await driver.findElement(By.xpath(xpathNomeCliente));

                // Copiando o conteúdo dos elementos
                let textoTelefone = await telefoneElemento.getText();
                let textoNomeCliente = await nomeClienteElemento.getText();

                console.log(Linha ${i} - Telefone: ${textoTelefone});
                console.log(Linha ${i} - Nome do Cliente: ${textoNomeCliente});

                // Copiando os textos para a área de transferência
                await driver.executeScript(navigator.clipboard.writeText(${JSON.stringify(textoTelefone + " " + textoNomeCliente)}););
                    
                // Abrir nova aba para "Blip" e realizar a operação
                await driver.executeScript("window.open('about:blank', '_blank');");
                abas = await driver.getAllWindowHandles();
                
                // Mudar para a aba "Blip"
                await driver.switchTo().window(abas[2]);

                // Navegar para a URL de operação
                await driver.get('https://actuar.desk.blip.ai/authorize#id_token=eyJhbGciOiJSUzI1NiIsImtpZCI6IjYyN2JjMGZjOTZmZmNiMWM1NDRkZDY2NGI2ODQwYWNmIiwidHlwIjoiSldUIn0.eyJuYmYiOjE3MTMzNTk5NTQsImV4cCI6MTcxMzM2MDI1NCwiaXNzIjoiaHR0cHM6Ly9hY2NvdW50LmJsaXAuYWkiLCJhdWQiOiJibGlwLWRlc2siLCJub25jZSI6IjJjZmM4YmUxMGFlNTQxYjE5OTVmMjg5ZWE4NjZjM2I4IiwiaWF0IjoxNzEzMzU5OTU0LCJhdF9oYXNoIjoiajBtV2ZXMnJLTWdMTC1aTl9sQ2tOQSIsInNpZCI6IjU1M2ViYmNjY2UyYWFhYmNkYTA5ZjE2ZDI0ZWI5MmUwIiwic3ViIjoiYzdjOGQ2ZTctYTM4NS00OWJmLTgwYWUtMzU3OWYwNzFlMDU5IiwiYXV0aF90aW1lIjoxNzEzMzU5OTI1LCJpZHAiOiJsb2NhbCIsImFtciI6WyJwd2QiXX0.jmipZcsS99-lDUTuecxtn91TyIGdKTAnc1wmRQ-ZYV8iPEdHsyHPKcnOuQFQAXqEb3nwbijWsPyLkta_KM12OygxhF7jZOlNj6waaLSWb__Ecgf-xu9aynssm8w7xsIp7m3aVUkkOBqBoc_eTEfrrrFhV_pLVfO2nnO08nTT7-ecfsha81biSOxvKo7GcYWg3kqPkTgrw3SrngZYJP7MZSJUfAO2SExEbu3bCEwAw-t7t-QwhbEcASsIDvp1RegMAlYk2Ok4WKemsnIOgcWqOzTHo3-9LsXr1PVV_lTcH-pVcr3VHP78oaS8tVbkxF7CMxdjZtdWQK92TvDJZIYn0Q&access_token=eyJhbGciOiJSUzI1NiIsImtpZCI6IjYyN2JjMGZjOTZmZmNiMWM1NDRkZDY2NGI2ODQwYWNmIiwidHlwIjoiSldUIn0.eyJuYmYiOjE3MTMzNTk5NTQsImV4cCI6MTcxMzQ0NjM1NCwiaXNzIjoiaHR0cHM6Ly9hY2NvdW50LmJsaXAuYWkiLCJhdWQiOiJodHRwczovL2FjY291bnQuYmxpcC5haS9yZXNvdXJjZXMiLCJjbGllbnRfaWQiOiJibGlwLWRlc2siLCJzdWIiOiJjN2M4ZDZlNy1hMzg1LTQ5YmYtODBhZS0zNTc5ZjA3MWUwNTkiLCJhdXRoX3RpbWUiOjE3MTMzNTk5MjUsImlkcCI6ImxvY2FsIiwiUHJvdmlkZXJEaXNwbGF5TmFtZSI6ImxvY2FsIiwiRnVsbE5hbWUiOiJBbGxhbiBSYXBoYWVsIiwiVXNlck5hbWUiOiJhbGxhbi5udW5lc0BhY3R1YXIuY29tIiwiRmlyc3ROYW1lIjoiQWxsYW4iLCJTdXJOYW1lIjoiUmFwaGFlbCIsImN1bHR1cmUiOiJwdC1CUiIsIlBob25lTnVtYmVyIjoiKzU1IDYyIDk4NDY1IDYwMTAiLCJBcmVhIjoiQXR0ZW5kYW5jZSIsIk9jY3VwYXRpb24iOiJBbmFseXN0IiwiQ3JlYXRlZEJ5TmV3QWNjb3VudFJlZ2lzdGVyIjoiVHJ1ZSIsIkVtYWlsIjoiYWxsYW4ubnVuZXNAYWN0dWFyLmNvbSIsIkVtYWlsQ29uZmlybWVkIjoiVHJ1ZSIsInNjb3BlIjpbIm9wZW5pZCIsInByb2ZpbGUiLCJlbWFpbCJdLCJhbXIiOlsicHdkIl19.g9g_zu5uyA9kFQYG4kxHF2sj7ShOOLafNx88mxNwDqK3l1iW6qlDA8ThXL0rhlqNBKbwP76jj8E83IUNSTdkBTPQwXmr0gcu3VoCP2VVOnzlQzJVtbHB_I5YQh0P2KiHJj51F3Rt4wUAQoCy5aTHcOgHf2WTGusz8XrNueoznfeuJGjDA57sOs3TeYxl4CBEztlNl0B7ChZorbCcs4EW9Z1hTcGDbWTgi7j7LBf2-iQqn556ezqNqFR8ar3DemdUGUd_ti0DXg3MQSNT-Km5QojgrklHsUQq88JRcIsVfkU0C-ZP7w4CFtv7NAvPe6YNNM7Tf95N992_X8BXFVu1Eg&token_type=Bearer&expires_in=86400&scope=openid%20profile%20email&state=e08746f8e2134303951923a20b4d8040&session_state=B69XfXu0Ig15eVw9WeRbkqnkv8NYIUyjdQ4vYHAqdh8.6af960382cb49aad87799a829a63cfd2'); // Ajuste a URL conforme necessário

                // Realize sua operação aqui, por exemplo, login e outras ações.
                await driver.sleep(2000); // Simulação de tempo gasto na operação

                console.log(Operação concluída na linha ${i});

                // Fechar a aba de operação e voltar para a aba "Contas a Receber"
                await driver.close();
                await driver.switchTo().window(abas[1]);

                // Pausa de 4 segundos antes de continuar para a próxima linha
                await driver.sleep(4000);

            } catch (err) {
                console.error(Erro ao processar a linha ${i}:, err);
            }
        }
    } finally {
        // Fechar o navegador
        await driver.wait(new Promise(resolve => setTimeout(resolve, 30000)));

    }
})();