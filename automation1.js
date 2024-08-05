const { Builder, By, Key, until } = require('selenium-webdriver');
require('chromedriver');

(async function example() {
    // Configuração do WebDriver (o path é automaticamente resolvido pelo chromedriver)
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        // 1. Abrir uma URL específica
        await driver.get('https://app.clickup.com/login');

        
        // 2. Clicar em um elemento
        let element1 = await driver.findElement(By.className('cu-form__input ng-pristine ng-invalid ng-touched'));
        console.log(element1)
        await element.click();
        

        // 3. Inserir texto em um campo de entrada
        let campoTexto = await driver.findElement(By.id('cu-form__input ng-pristine ng-invalid ng-touched'));
        await campoTexto.sendKeys('Texto para inserir');

        
        
        
        // 6. Selecionar um item em um dropdown (menu suspenso)
        let dropdown = await driver.findElement(By.id('meuDropdown'));
        let select = await driver.findElement(By.xpath("//option[. = 'Opção 1']"));
        await select.click();

        // 7. Esperar até que um elemento esteja presente na página
        await driver.wait(until.elementLocated(By.id('meuElemento')), 10000);

        // 8. Armazenar um valor em uma variável
        let valor = await driver.findElement(By.id('meuCampoDeTexto')).getAttribute('value');

        // 9. Verificar se um elemento está presente na página
        let elementos = await driver.findElements(By.id('meuElemento'));
        if (elementos.length === 0) {
            throw new Error('Elemento não está presente');
        }

        // 10. Exibir uma mensagem no log (console)
        console.log('Esta é uma mensagem de log');
    } finally {
        // Finalizar a sessão do navegador
        await driver.quit();
    }
})();