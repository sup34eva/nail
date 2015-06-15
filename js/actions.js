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
  meshCount++; //index du tableau d'objets
  index = meshCount; //Index du du boutton courant

  world.scenes[world.zone_id].meshTab[meshCount] = new Mesh(); //Instanciation d'un objet

  var button = document.createElement("label"); // Cree un bouton
  button.innerHTML = '<input type="radio">' + document.getElementById('name').value; // Met un titre au bouton
  button.dataset.mesh = index; //Cree un dataset mesh avec l'index du bouton
  button.onclick = function(e) {
    indexation(this.dataset.mesh); //Quand on clique sur le boutton renvoie son index dans la fonction indexation
  };
  ["btn", "btn-success", "nav-justified"].forEach(function(e) {
    button.classList.add(e) //Ajoute toutes classes au label
  }); // Ajoute des class
  document.getElementById("objets").appendChild(button); // Ajoute le bouton dans la page

  positionx.value = 1; //Donne des valeurs par defaut a l objet
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
    meshCount--; //Decremente le compte d'objets
  } else //si objet groupé
  {
    document.querySelector('[data-grp="' + index + '"]').remove(); //Supprime le boutton
    world.scenes[world.zone_id].grp_tab.splice(index, 1); // Supprime la case dans le tableau
    var nodes = document.getElementById("objets").childNodes;
    for (i = 0; i < nodes.length; i++) {
      if (nodes[i].dataset.grp > index) { //Pour chaque élément ayant un id > a celui supprimer
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
    btn_ok.style.display = "none"; //Fait disparaitre le bouton
    world.scenes[world.zone_id].grp_tab.push({
      name: "Groupe",
      objects: Array.prototype.slice.call(document.getElementById("objets").querySelectorAll(":checked")).map(function(e) { //Prend tous les objets checked et les mets dans un tableau
        return e.parentNode.dataset.mesh;
      })
    });
    var button = document.createElement("label"); // Cree un bouton
    button.innerHTML = '<input type="radio">' + "Groupe"; // Met un titre au bouton
    button.setAttribute("name", "Groupe"); // Donne le nom groupe au boutton
    var grp_id = grp_count;
    button.dataset.grp = grp_id; // cree un dataset grp avec l'index du bouton
    button.onclick = function(e) {
      grp_index(this.dataset.grp); //Quand on clique renvoie l'index du bouton dans la fonction grp_index
    };
    ["btn", "btn-violet", "nav-justified"].forEach(function(e) {
      button.classList.add(e) // Ajoute toutes les classes css au bouton
    }); // Ajoute des class
    document.getElementById("objets").appendChild(button); // Ajoute le bouton dans la page
    grp_count++; //Increment le compteur de boutons de groupe
  } else {
    alert("Selectionnez au moins 2 objets."); //Leve une erreur quand on essaie de grouper moins de 2 objets
    btn_ok.style.display = "none"; // Cache le bouton ok
  }
  Array.prototype.slice.call(document.getElementById("objets").querySelectorAll("[type=checkbox]")).forEach(function(e) { //pour tous les elements de type checkbox
    e.type = "radio"; //La checkbox devient un input type radio
    e.checked = false; //Elle n'est pas check
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
check.onclick = function() { //Fonction qui permet d'agrandir un d'objet de la meme valeur dans toutes les directions
  if ($(".hiden").css("display") == "none") {
    $(".hiden").css("display", "block"); // Fait apparaitre les autres inputs pour les tailles
  } else {
    $(".hiden").css("display", "none"); // Fait disparaitre les autres inputs pour les tailles
  }
};

var taillex = document.getElementById('taillex');
taillex.onchange = function() {
  world.scenes[world.zone_id].meshTab[index].scaling.x = taillex.value; //Change la taille x
  if (check.checked) { //******************Agrandissement synchro***************
    world.scenes[world.zone_id].meshTab[index].scaling.y = taillex.value;
    world.scenes[world.zone_id].meshTab[index].scaling.z = taillex.value;
  }
};
//*********************Modif meshs**********************************************
var tailley = document.getElementById('tailley');
tailley.onchange = function() {
  world.scenes[world.zone_id].meshTab[index].scaling.y = tailley.value; //Change la taille y
};

var taillez = document.getElementById('taillez');
taillez.onchange = function() {
  world.scenes[world.zone_id].meshTab[index].scaling.z = taillez.value; //Change la taille z
};

var rotx = document.getElementById('rotx');
rotx.onchange = function() {
  world.scenes[world.zone_id].meshTab[index].rotation.x = rotx.value / 180 * Math.PI; //Converti les radians en degres et fait tourner l'objet sur l'axe x
};

var roty = document.getElementById('roty');
roty.onchange = function() {
  world.scenes[world.zone_id].meshTab[index].rotation.y = roty.value / 180 * Math.PI; //Converti les radians en degres et fait tourner l'objet sur l'axe y
};

var rotz = document.getElementById('rotz');
rotz.onchange = function() {
  world.scenes[world.zone_id].meshTab[index].rotation.z = rotz.value / 180 * Math.PI; //Converti les radians en degres et fait tourner l'objet sur l'axe z
};

var positiony = document.getElementById('posy');
positiony.onchange = function() {
  world.scenes[world.zone_id].meshTab[index].position.y = positiony.value; //Change la position y
};

var positionx = document.getElementById('posx');
positionx.onchange = function() {
  world.scenes[world.zone_id].meshTab[index].position.x = positionx.value; //Change la position x
};

var positionz = document.getElementById('posz');
positionz.onchange = function() {
  world.scenes[world.zone_id].meshTab[index].position.z = positionz.value; //Change la position z
};

var camReset = document.getElementById('camReset');
camReset.onclick = function() {
  world.scenes[world.zone_id].scene.activeCamera.position = new BABYLON.Vector3(0, 0, 0); //Met la camera a 0, 0, 0
};

var zoneadd = document.getElementById('zone_add');
zoneadd.onclick = function() { //Function pour ajouter une zone
  world.zone_count++; //Incremente le compteur de zones
  world.zone_id = world.scenes.push({ //Met le zone id au nombre de case de world.scene
    meshTab: [], //Cree un nouveau tableau de mesh
    grp_tab: [], //Cree un nouveau tableau de groupe
    scene: new BABYLON.Scene(engine) //Cree une nouvelle scene
  }) - 1;
  world.scenes[world.zone_id].scene.collisionsEnabled = true; //Autorise la collision avec les murs
  var init = new createScene(); //Rempli la scene avec les elements de base
  var button = document.createElement("label"); // Cree un bouton
  button.innerHTML = '<input type="radio">' + world.name + world.zone_id; // Met un titre au bouton
  button.dataset.zone = world.zone_count;  //cree un dataset zone avec l'index du bouton
  button.onclick = function(e) {
    zoneCharge(this.dataset.zone); // Quand on clique renvoie l'index du bouton dans la fonction zoneCharge
  };
  ["btn", "btn-success", "nav-justified"].forEach(function(e) {
    button.classList.add(e) // Ajoute toutes les classes au bouton
  }); // Ajoute des class
  document.getElementById("zones").appendChild(button); // Ajoute le bouton dans la page
  $("#objets").empty(); // Supprime touts les boutons des objets
  currentzone.innerHTML = 'Zone :' + world.zone_id; //Change l'affichage de la zone courante
};

var zonesup = document.getElementById('zone_sup');
zonesup.onclick = function() { //Fonction pour supprimer une zone
  document.querySelector('[data-zone="' + world.zone_id + '"]').remove(); //Supprime le boutton
  world.scenes.splice(world.zone_id, 1);//Supprime la case du tableau
  var nodes = document.getElementById("zones").childNodes;
  for (i = 0; i < nodes.length; i++) {
    if (nodes[i].dataset && nodes[i].dataset.zone > world.zone_id) { //Pour chaque élément ayant un id < a celui supprimer
      nodes[i].dataset.zone = nodes[i].dataset.zone - 1; // Leur id décremente de 1
    }
  }
  world.zone_count--; //Decremente le compteur de zone
  world.zone_id = world.zone_count; //Met l'id de la zonne a la derniere scene du tableau pour evite d'etre dans une scene qui n'existe plus 
}
