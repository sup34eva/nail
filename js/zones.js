var canvas = document.getElementById("renderCanvas");
var engine = new BABYLON.Engine(canvas, true);

function Zones (){
   this.scenes = [];
   this.zone_id = 0;
}

var zone = new Zones();
zone.zone_id = zone.scenes.push(new BABYLON.Scene(engine))-1;
zone.scenes[zone.zone_id].collisionsEnabled = true;
