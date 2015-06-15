var canvas = document.getElementById("renderCanvas");
var engine = new BABYLON.Engine(canvas, true);

function Zones() {
  this.scenes = [];
  this.scenes.push({
    meshTab: [], //Tableau qui contient les meshs
    grp_tab: [], //Tableau qui contient les groupes
    scene: new BABYLON.Scene(engine) // Nouvelle scene
  })
  this.zone_id = 0; //Id de la zone courante
  this.name = "zone ";
  this.zone_count = 0; //Compteur de zone
}

var world = new Zones(); //Instanciation de la classe Zones
world.scenes[world.zone_id].scene.collisionsEnabled = true; // Met les colisions avec les murs a true

function zoneCharge(x) {
  world.zone_id = x;//Quand on clique sur un bouton de zone renvoie son index
  currentzone.innerHTML = 'Zone :' + world.zone_id;
  //supprime les boutons
  $("#objets").empty();

  meshCount = 0;
  world.scenes[world.zone_id].meshTab.forEach(function(e) {//Pour chaque objets contenu dans le meshTab
    var button = document.createElement("label"); // Cree un bouton
    button.innerHTML = '<input type="radio">' + e.name; // Met un titre au bouton
    button.dataset.mesh = meshCount; //Cree un dataset mesh avec l'index du bouton
    button.onclick = function(e) {
      indexation(this.dataset.mesh); //Quand on clique sur le boutton renvoie son index dans la fonction indexation
    };
    ["btn", "btn-success", "nav-justified"].forEach(function(e) {
      button.classList.add(e) //Ajoute toutes les classes au bouton
    });
    document.getElementById("objets").appendChild(button); // Ajoute le bouton dans la page
    meshCount++; //Incremente le nombre d'objets
  });

  grp_count = 0;
  world.scenes[world.zone_id].grp_tab.forEach(function(e) {//Pour chaque objets contenu dans le meshTab
    var button = document.createElement("label"); // Cree un bouton
    button.innerHTML = '<input type="radio">' + e.name; // Met un titre au bouton
    var grp_id = grp_count;
    button.dataset.grp = grp_id; // cree un dataset grp avec l'index du bouton
    button.onclick = function(e) {
      grp_index(this.dataset.grp); //Quand on clique renvoie l'index du bouton dans la fonction grp_index
    };
    ["btn", "btn-violet", "nav-justified"].forEach(function(e) {
      button.classList.add(e) // Ajoute toutes les classes css au bouton
    }); // Ajoute des class
    document.getElementById("objets").appendChild(button); // Ajoute le bouton dans la page
    grp_count++; //Incremente le nombre d'objets
  });
}
