var canvas = document.getElementById("renderCanvas");
var engine = new BABYLON.Engine(canvas, true);
var meshTab = []; //Tableau d'objets
var grp_tab = []; //tableau de groupes

function Zones() {
  this.scenes = [];
  this.scenes.push({
    meshTab: meshTab,
    grp_tab: grp_tab,
    scene: new BABYLON.Scene(engine)
  })
  this.zone_id = 0;
  this.name = "zone ";
}

var world = new Zones();
world.scenes[world.zone_id].scene.collisionsEnabled = true;

function zoneCharge(x) {
  world.zone_id = x;

  //supprime les boutons
  $("#objets").empty();

  meshCount = 0;
  console.log(world.scenes[world.zone_id].meshTab);
  world.scenes[world.zone_id].meshTab.forEach(function(e) {
    //ajout du bouton dans l'interface
    var button = document.createElement("label"); // Cree un bouton
    button.innerHTML = '<input type="radio">' + e.name; // Met un titre au bouton
    button.setAttribute("id", meshCount); // L'id sera l'index du tableau
    button.setAttribute("onClick", "indexation(parseInt(this.id))"); // Donne la function qui gere quel bouton est cliqué
    ["btn", "btn-success", "nav-justified"].forEach(function(e) {
      button.classList.add(e)
    }); // Ajoute des class
    document.getElementById("objets").appendChild(button); // Ajoute le bouton dans la page

    meshCount++;

  });


/*  var grp_count = 0;
  world.scenes[world.zone_id].grp_tab.forEach(function(e) {
    //ajout du bouton de groupe
    var button = document.createElement("label"); // Cree un bouton
    button.innerHTML = '<input type="radio">' + e.name; // Met un titre au bouton
    button.setAttribute("id", grp_count); // L'id sera l'index du tableau
    button.setAttribute("name", "Groupe");
    button.setAttribute("onClick", "grp_index(parseInt(this.id))"); // Donne la function qui gere quel bouton est cliqué
    ["btn", "btn-violet", "nav-justified"].forEach(function(e) {
      button.classList.add(e)
    }); // Ajoute des class
    document.getElementById("objets").appendChild(button); // Ajoute le bouton dans la page

    grp_count++;
  });*/

}
