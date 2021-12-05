var input;
var nick;
var lista;
var usuarioActivo;
var options;
var mybutton;
$(document).ready(function() {
	//Info usuario lista y entrada
	input = document.getElementById("searcher");
	lista = document.getElementById("listUsers");
	usuarioActivo = document.getElementById("idu");
	input.addEventListener("input", userSearcher);
	$("#searcher").change(function() {
		loadOptions();
		var id = $("#searcher").data("id");
		if (id != undefined) {
			location.href = "/app/perfil?id=" + id;
		}
	});


//Get the button:
mybutton = document.getElementById("myBtn");
mybutton.style.display = "none";
mybutton.addEventListener("click",topFunction);

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

	//Buscador amigos
	$("#amigos-searcher").change(function() {
		var idU=$("#idu").val();
		var username=$(this).val();
		loadAmigos(username, idU);
	});

	//Click lupa buscador de usuarios
	$("#search-icon").click(function() {
		if ($("#searcher").data("id") != undefined) {
			var id = $("#searcher").data("id");
			location.href = "/app/perfil?id=" + id;
		}
	});


	//Link perfil solicitudes
	$(".linkPerfilAmigo").click(function() {
		var idusuario = $(this).find("input").val();
		location.href = "/app/perfil?id=" + idusuario;
	});


});


 async function loadAmigos(username, idU) {
	location.href="/app/friendchatsearcher/"+username+"/"+idU;
}



async function userSearcher() {

	nick = input.value;
	var response = await fetch(`/api/usersearch/` + nick + "/" + usuarioActivo.value);
	var usuarios = await response.json();
	loadOptions();
	lista.innerHTML = '';
	showUsuarios(usuarios);

}

function showUsuarios(usuarios) {
	for (const usuario of usuarios) {

		var option = document.createElement("option");
		option.setAttribute("class", "btnPerfil");
		option.dataset.id = usuario.idusuario;
		var showname = `${usuario.username}, ${usuario.nombre}`;
		option.setAttribute("value", showname);
		$("#listUsers").append(option);

	}

}

function loadOptions() {
	options = $("#listUsers").children();
	for (option of options) {
		if (nick == option.value) {
			var id = option.getAttribute("data-id");
			input.dataset.id = id;
		}
	}

}