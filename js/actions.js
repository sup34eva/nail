//*********************Full Screen**********************************************
var fullscreen = document.getElementById("fullscreenButton");

fullscreen.onclick = function() {
    if (canvas.requestFullscreen) {
      canvas.requestFullscreen();
    } else if (canvas.mozRequestFullScreen) {
      canvas.mozRequestFullScreen();
    } else if (canvas.webkitRequestFullscreen) {
      canvas.webkitRequestFullscreen();
    }
  }
  //*********************Ajout objet**********************************************
var btn_add = document.getElementById('btn_add');
btn_add.onclick = function() {
  meshCount++; //index tu tableau d'objets
  index = meshCount;

  world.scenes[world.zone_id].meshTab[meshCount] = new Mesh(); //Instanciation d'un objet

  var button = document.createElement("label"); // Cree un bouton
  button.innerHTML = '<input type="radio">' + document.getElementById('name').value; // Met un titre au bouton
  button.dataset.mesh = index;
  button.onclick = function(e) {
    indexation(this.dataset.mesh);
  };
  ["btn", "btn-success", "nav-justified"].forEach(function(e) {
    button.classList.add(e)
  }); // Ajoute des class
  document.getElementById("objets").appendChild(button); // Ajoute le bouton dans la page

  positionx.value = 1;
  positiony.value = 1;
  positionz.value = 1;
  taillex.value = 0;
  tailley.value = 0;
  taillez.value = 0;
  rotx.value = 0.0;
  roty.value = 0.0;
  rotz.value = 0.0;
  picker.value = "#FFFFFF";
};
//*********************Suppr objet**********************************************
var btn_sup = document.getElementById('btn_sup');
btn_sup.onclick = function() {
  if (document.getElementById("objets").querySelector(":checked").parentNode.dataset.mesh) //si objet seul
  {
    if (world.scenes[world.zone_id].meshTab[index]) {
      world.scenes[world.zone_id].meshTab[index].dispose(); //Supprime l'élement dans le canvas
      document.querySelector('[data-mesh="' + index + '"]').remove(); //Supprime le boutton
      world.scenes[world.zone_id].meshTab.splice(index, 1); //Supprime la case du tableau
      var nodes = document.getElementById("objets").childNodes;
      for (i = 0; i < nodes.length; i++) {
        if (nodes[i].dataset.mesh > index) //Pour chaque élément ayant un id > a celui supprimer
        {
          nodes[i].dataset.mesh = nodes[i].dataset.mesh - 1; // Leur id décremente de 1
        }
      }
    }
    meshCount--;
  } else //si objet groupé
  {
    document.querySelector('[data-grp="' + index + '"]').remove(); //Supprime le boutton
    world.scenes[world.zone_id].grp_tab.splice(index, 1);
    var nodes = document.getElementById("objets").childNodes;
    for (i = 0; i < nodes.length; i++) {
      if (nodes[i].dataset.grp > index) { //Pour chaque élément ayant un id < a celui supprimer
        nodes[i].dataset.grp = nodes[i].dataset.grp - 1; // Leur id décremente de 1
      }
    }

    grp_count--;
  }
};
//*********************Ajout groupe*********************************************
var btn_ok = document.getElementById('btn_ok_grp');
btn_ok.onclick = function() { //Fonction groupe

  if (document.getElementById("objets").querySelectorAll(":checked").length > 1) {
    btn_ok.style.display = "none";
    world.scenes[world.zone_id].grp_tab.push({
      name: "Groupe",
      objects: Array.prototype.slice.call(document.getElementById("objets").querySelectorAll(":checked")).map(function(e) {
        return e.parentNode.dataset.mesh;
      })
    });
    var button = document.createElement("label"); // Cree un bouton
    button.innerHTML = '<input type="radio">' + "Groupe"; // Met un titre au bouton
    button.setAttribute("name", "Groupe");
    var grp_id = grp_count;
    button.dataset.grp = grp_id;
    button.onclick = function(e) {
      grp_index(this.dataset.grp);
    };
    ["btn", "btn-violet", "nav-justified"].forEach(function(e) {
      button.classList.add(e)
    }); // Ajoute des class
    document.getElementById("objets").appendChild(button); // Ajoute le bouton dans la page
    grp_count++;
  } else {
    alert("Selectionnez au moins 2 objets.");
    btn_ok.style.display = "none";
  }
  Array.prototype.slice.call(document.getElementById("objets").querySelectorAll("[type=checkbox]")).forEach(function(e) {
    e.type = "radio";
    e.checked = false;
  });
};
//*********************Modif groupe*********************************************
var grp_posxp = document.getElementById('btnplusx');
grp_posxp.onclick = function() //x plus
  {
    world.scenes[world.zone_id].grp_tab[index].objects.forEach(function(element, index) {
      world.scenes[world.zone_id].meshTab[element].position.x++;
    })
  };

var grp_posxm = document.getElementById('btnmoinsx');
grp_posxm.onclick = function() //x moins
  {
    world.scenes[world.zone_id].grp_tab[index].objects.forEach(function(element, index) {
      world.scenes[world.zone_id].meshTab[element].position.x--;
    })
  };

var grp_posyp = document.getElementById('btnplusy');
grp_posyp.onclick = function() //y plus
  {
    world.scenes[world.zone_id].grp_tab[index].objects.forEach(function(element, index) {
      world.scenes[world.zone_id].meshTab[element].position.y++;
    })
  };

var grp_posym = document.getElementById('btnmoinsy');
grp_posym.onclick = function() //y moins
  {
    world.scenes[world.zone_id].grp_tab[index].objects.forEach(function(element, index) {
      world.scenes[world.zone_id].meshTab[element].position.y--;
    })
  };

var grp_poszp = document.getElementById('btnplusz');
grp_poszp.onclick = function() //z plus
  {
    world.scenes[world.zone_id].grp_tab[index].objects.forEach(function(element, index) {
      world.scenes[world.zone_id].meshTab[element].position.z++;
    })
  };

var grp_poszm = document.getElementById('btnmoinsz');
grp_poszm.onclick = function() //z moins
  {
    world.scenes[world.zone_id].grp_tab[index].objects.forEach(function(element, index) {
      world.scenes[world.zone_id].meshTab[element].position.z--;
    })
  };

var check = document.getElementById('check');
check.onclick = function() {
  if ($(".hiden").css("display") == "none") {
    $(".hiden").css("display", "block");
  } else {
    $(".hiden").css("display", "none");
  }
};
//******************Agrandissement synchro**************************************
var taillex = document.getElementById('taillex');
taillex.onchange = function() {
  world.scenes[world.zone_id].meshTab[index].scaling.x = taillex.value;
  if (check.checked) {
    world.scenes[world.zone_id].meshTab[index].scaling.y = taillex.value;
    world.scenes[world.zone_id].meshTab[index].scaling.z = taillex.value;
  }
};
//*********************Modif meshs**********************************************
var tailley = document.getElementById('tailley');
tailley.onchange = function() {
  world.scenes[world.zone_id].meshTab[index].scaling.y = tailley.value;
};

var taillez = document.getElementById('taillez');
taillez.onchange = function() {
  world.scenes[world.zone_id].meshTab[index].scaling.z = taillez.value;
};

var rotx = document.getElementById('rotx');
rotx.onchange = function() {
  world.scenes[world.zone_id].meshTab[index].rotation.x = rotx.value / 180 * Math.PI;
};

var roty = document.getElementById('roty');
roty.onchange = function() {
  world.scenes[world.zone_id].meshTab[index].rotation.y = roty.value / 180 * Math.PI;
};

var rotz = document.getElementById('rotz');
rotz.onchange = function() {
  world.scenes[world.zone_id].meshTab[index].rotation.z = rotz.value / 180 * Math.PI;
};

var positiony = document.getElementById('posy');
positiony.onchange = function() {
  world.scenes[world.zone_id].meshTab[index].position.y = positiony.value;
};

var positionx = document.getElementById('posx');
positionx.onchange = function() {
  world.scenes[world.zone_id].meshTab[index].position.x = positionx.value;
};

var positionz = document.getElementById('posz');
positionz.onchange = function() {
  world.scenes[world.zone_id].meshTab[index].position.z = positionz.value;
};

var camReset = document.getElementById('camReset');
camReset.onclick = function() {
  world.scenes[world.zone_id].scene.activeCamera.position = new BABYLON.Vector3(0, 0, 0);
};

var zoneadd = document.getElementById('zone_add');
zoneadd.onclick = function() {
  world.zone_count ++;
  world.zone_id = world.scenes.push({
    meshTab: [],
    grp_tab: [],
    scene: new BABYLON.Scene(engine)
  }) - 1;
  world.scenes[world.zone_id].scene.collisionsEnabled = true;
  var init = new createScene();
  var button = document.createElement("label"); // Cree un bouton
  button.innerHTML = '<input type="radio">' + world.name + world.zone_id; // Met un titre au bouton
  button.dataset.zone = world.zone_count;
  button.onclick = function(e) {
    zoneCharge(this.dataset.zone);
  };
  ["btn", "btn-success", "nav-justified"].forEach(function(e) {
    button.classList.add(e)
  }); // Ajoute des class
  document.getElementById("zones").appendChild(button); // Ajoute le bouton dans la page
  $("#objets").empty();
};

var zonesup = document.getElementById('zone_sup');
zonesup.onclick = function() {
  document.querySelector('[data-zone="' + world.zone_id + '"]').remove(); //Supprime le boutton
  world.scenes.splice(world.zone_id, 1);
  var nodes = document.getElementById("zones").childNodes;
  for (i = 0; i < nodes.length; i++) {
    if (nodes[i].dataset && nodes[i].dataset.zone > world.zone_id) { //Pour chaque élément ayant un id < a celui supprimer
      nodes[i].dataset.zone = nodes[i].dataset.zone - 1; // Leur id décremente de 1
    }
  }
  world.zone_count --;
  world.zone_id = world.zone_count;
}
