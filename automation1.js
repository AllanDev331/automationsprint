const { Builder, By, Key, until } = require('selenium-webdriver');
require('chromedriver');

(async function example() {
    // Configuração do WebDriver (o path é automaticamente resolvido pelo chromedriver)
    let driver = await new Builder().forBrowser('chrome').build();
    try {

        // 1. Abrir a URL Actuar
                 await driver.get('https://app.actuar.com/#/common/login');
        
                 let elementModoEu = await driver.findElement(By.className('btn btn-primary ladda-button'));
        await elementModoEu.click()

                 // 2. inserir o Email no campo Email

            let email = "allan.nunes@actuar.com"
            let senha = "Actuar1508@"

            let elemento12 = await driver.findElement(By.xpath('//*[@id="Email"]/section/div/input'));
            await elemento12.sendKeys(email);
        
            // 3. inserir a senha no campo senha

        let elementosenha = await driver.findElement(By.xpath('//*[@id="Password"]/section/div/input'));
        await elementosenha.sendKeys(senha);
        //clicar em enter para acessar
        let elementToClick = await driver.findElement(By.xpath('//*[@id="e370daff-5407-4844-9440-89fcba96105c"]/form/div/div'));
        await elementToClick.click()
        
        // clicar em X na mensagem notificação
        let elementToClickX = await driver.wait(until.elementLocated(By.xpath('/html/body/app-root/cu-app-shell/cu-manager/div[1]/cu-web-push-notification-banner/cu3-alert-banner/button')), 30000);
        await elementToClickX.click();
        
        // clicar em modo eu

        let nao = await driver.findElement(By.className('cu-filter-assignees__options-toggle cu-dropdown__toggle'));
        await elementModoEu.click()
        // copiar o ID do cliente
        let elementToHover = await driver.wait(until.elementLocated(By.xpath('//*[@id="task-container-86a4bgz1h"]/cu-task-row-custom-field[3]/cu-custom-field/button/cu-custom-field-type')), 40000);
        await driver.wait(until.elementIsVisible(elementToHover), 40000);
        //
        let actions = driver.actions({ async: true });
        await actions.move({ origin: elementToHover }).perform();
        await driver.sleep(3000); 
        //
        let elementToClickAfterHover = await driver.wait(until.elementLocated(By.css('.cu-custom-field__copy use')), 10000);
        await driver.wait(until.elementIsVisible(elementToClickAfterHover), 10000);
        await actions.move({ origin: elementToClickAfterHover }).click().perform();
    
        // retirar o modo eu
        let elementretirarModoEu = await driver.findElement(By.className('cu-filter-assignees__options-toggle cu-dropdown__toggle'));
        await elementretirarModoEu.click()
       //acessar actuar login \\
       await driver.get('https://app.actuar.com/#/common/login');
       //inserir email \\
       let elemento2 = await driver.findElement(By.xpath(''));
       await elemento2.sendKeys(email);
    

              // 10. Exibir uma mensagem no log (console)
              console.log('Esta é uma mensagem de log');
            } finally {
                // Finalizar a sessão do navegador
            }
        })();
