document.addEventListener('DOMContentLoaded', function() {  
  // Najít sekci s doplňkovými parametry  
  const parametersSection = document.querySelector('.detail-parameters');  
  
  // Pokud sekce existuje, přesuneme ji  
  if (parametersSection) {  
    // Najít záložkový kontejner  
    const tabsContainer = document.querySelector('.responsive-tabs');  
    
    if (tabsContainer) {  
      // Vytvořit kopii parametrů  
      const parametersSectionClone = parametersSection.cloneNode(true);  
      
      // Zkontrolovat, zda už záložka Parametry neexistuje  
      const existingTab = Array.from(tabsContainer.querySelectorAll('.r-tab-heading')).find(tab =>   
        tab.textContent.includes('Parametry') || tab.textContent.includes('Doplňkové parametry')  
      );  
      
      // Pokud záložka neexistuje, vytvoříme ji  
      if (!existingTab) {  
        // Vytvořit novou záložku  
        const newTab = document.createElement('div');  
        newTab.className = 'responsive-tab';  
        
        // Vytvořit nadpis záložky  
        const newTabHeading = document.createElement('div');  
        newTabHeading.className = 'r-tab-heading';  
        newTabHeading.textContent = 'Parametry produktu';  
        newTab.appendChild(newTabHeading);  
        
        // Vytvořit obsah záložky  
        const newTabContent = document.createElement('div');  
        newTabContent.className = 'r-tab-content';  
        newTabContent.appendChild(parametersSectionClone);  
        newTab.appendChild(newTabContent);  
        
        // Vložit záložku mezi Popis a Diskuzi (pokud existuje záložka Diskuze)  
        const discussionTab = Array.from(tabsContainer.querySelectorAll('.responsive-tab')).find(tab => {  
          const heading = tab.querySelector('.r-tab-heading');  
          return heading && heading.textContent.includes('Diskuze');  
        });  
        
        if (discussionTab) {  
          tabsContainer.insertBefore(newTab, discussionTab);  
        } else {  
          tabsContainer.appendChild(newTab);  
        }  
        
        // Skrýt původní sekci parametrů  
        parametersSection.style.display = 'none';  
      }  
    }  
  }  
});  
