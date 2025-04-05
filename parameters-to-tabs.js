// Počkáme na úplné načtení stránky, aby byly všechny elementy dostupné  
window.addEventListener('load', function() {  
  // Počkáme ještě trochu déle, aby se vše stihlo inicializovat  
  setTimeout(function() {  
    console.log('Skript pro přesun doplňkových parametrů se spouští...');  
    
    // 1. Najdeme doplňkové parametry v divu s třídou extended-description  
    var parametryElement = document.querySelector('.extended-description');  
    
    // 2. Najdeme záložkový systém - podle struktury, kterou jste poskytl  
    var zalobkyList = document.querySelector('ul.shp-tabs.p-detail-tabs');  
    
    // 3. Najdeme kontejner s obsahem záložek  
    var tabContents = document.querySelector('.tab-content');  
    
    // Výpis nalezených elementů pro ladění  
    console.log('Nalezené elementy:');  
    console.log('- Parametry:', parametryElement);  
    console.log('- Seznam záložek:', zalobkyList);  
    console.log('- Kontejner obsahu záložek:', tabContents);  
    
    // 4. Pokud jsou všechny potřebné elementy nalezeny, pokračujeme  
    if (parametryElement && zalobkyList && tabContents) {  
      console.log('Všechny potřebné elementy byly nalezeny, vytvářím novou záložku...');  
      
      // 5. Vytvoříme novou záložku v seznamu  
      var novaZalozkaLi = document.createElement('li');  
      novaZalozkaLi.className = 'shp-tab';  
      novaZalozkaLi.setAttribute('data-testid', 'tabParameters');  
      
      // 6. Vytvoříme odkaz uvnitř záložky  
      var novaZalozkaA = document.createElement('a');  
      novaZalozkaA.href = '#productParameters';  
      novaZalozkaA.className = 'shp-tab-link';  
      novaZalozkaA.setAttribute('role', 'tab');  
      novaZalozkaA.setAttribute('data-toggle', 'tab');  
      novaZalozkaA.textContent = 'Parametry produktu';  
      
      // 7. Vložíme odkaz do položky seznamu  
      novaZalozkaLi.appendChild(novaZalozkaA);  
      
      // 8. Přidáme novou záložku do seznamu záložek - vložíme ji před záložku Diskuze  
      var diskuzeZalozka = zalobkyList.querySelector('[data-testid="tabDiscussion"]');  
      if (diskuzeZalozka) {  
        zalobkyList.insertBefore(novaZalozkaLi, diskuzeZalozka);  
      } else {  
        // Pokud záložka Diskuze neexistuje, přidáme ji na konec  
        zalobkyList.appendChild(novaZalozkaLi);  
      }  
      
      // 9. Vytvoříme nový obsah záložky  
      var novyObsahDiv = document.createElement('div');  
      novyObsahDiv.className = 'tab-pane';  
      novyObsahDiv.id = 'productParameters';  
      novyObsahDiv.setAttribute('role', 'tabpanel');  
      
      // 10. Vložíme obsah parametrů do nového obsahu záložky  
      novyObsahDiv.innerHTML = parametryElement.innerHTML;  
      
      // 11. Přidáme nový obsah do kontejneru s obsahem záložek  
      tabContents.appendChild(novyObsahDiv);  
      
      // 12. Skryjeme původní doplňkové parametry  
      parametryElement.style.display = 'none';  
      
      console.log('Doplňkové parametry byly úspěšně přesunuty do záložek!');  
      
      // 13. Přidáme event handler pro kliknutí na záložku  
      novaZalozkaA.addEventListener('click', function(e) {  
        e.preventDefault();  
        
        // Odstraníme třídu 'active' ze všech záložek  
        zalobkyList.querySelectorAll('.shp-tab').forEach(function(tab) {  
          tab.classList.remove('active');  
        });  
        
        // Přidáme třídu 'active' nové záložce  
        novaZalozkaLi.classList.add('active');  
        
        // Skryjeme všechny obsahy záložek  
        tabContents.querySelectorAll('.tab-pane').forEach(function(content) {  
          content.classList.remove('active');  
        });  
        
        // Zobrazíme obsah nové záložky  
        novyObsahDiv.classList.add('active');  
      });  
      
      // 14. Pokud je dostupná, použijeme Bootstrap Tab API  
      if (typeof $ !== 'undefined' && $.fn && $.fn.tab) {  
        console.log('Inicializuji Bootstrap záložky...');  
        $(novaZalozkaA).tab();  
      }  
      
    } else {  
      console.error('Nepodařilo se najít všechny potřebné elementy:');  
      console.error('- Parametry:', parametryElement);  
      console.error('- Seznam záložek:', zalobkyList);  
      console.error('- Kontejner obsahu záložek:', tabContents);  
      
      // Diagnostika - výpis všech elementů, které by mohly být relevantní  
      console.log('Diagnostika - všechny relevantní elementy:');  
      document.querySelectorAll('[class*="tab"], [class*="Tab"], [class*="descrip"], [class*="Descrip"]').forEach(function(el) {  
        console.log(el.className, el);  
      });  
    }  
  }, 1500); // Počkáme 1.5 sekundy, aby se stránka plně načetla  
});  
