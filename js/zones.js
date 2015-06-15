var canvas = document.getElementById("renderCanvas");
var engine = new BABYLON.Engine(canvas, true);

function Zones() {
  this.scenes = [];
  this.scenes.push({
    meshTab: [],
    grp_tab: [],
    scene: new BABYLON.Scene(engine)
  })
  this.zone_id = 0;
  this.name = "zone ";
  this.zone_count = 0;
}

var world = new Zones();
world.scenes[world.zone_id].scene.collisionsEnabled = true;

function zoneCharge(x) {
  world.zone_id = x;

  //supprime les boutons
  $("#objets").empty();

  meshCount = 0;
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
}
