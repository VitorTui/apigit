function buscaUsuario() {
    const userName = $("#name").val();
    const url = `https://api.github.com/users/${userName}`;
    const urlRepos = `https://api.github.com/users/${userName}/repos`;
    const sort = $("#sort_repos").val();
    const direction = $("#direction_repos").val();
    console.log(sort);
    console.log(direction);
    console.log(userName);

    $.ajax({
        type: 'GET',
        url: url,
        success: function (response) {
            console.log(response)
            $('#usuario').css('display', 'block');
            $('#usuario_n_encontrado').css('display', 'none');

            $('#usuario_numSeguidores').text(response.followers);
            $('#usuario_numSeguidos').text(response.following);
            $('#img_avatar').attr('src', response.avatar_url);
            $('#E-mail').text(response.email_usuario);
            $('#Bio').text(response.bio_usuario);
        },
        error: function () {
            alert("Digite um perfil válido")
            $('#usuario_n_encontrado').css('display', 'block');
        }
    })

    $.ajax({
        type: 'GET',
        url: urlRepos,
        data: {
            sort: sort,
            direction: direction
        },
        success: function (response) {
            console.log(response)
            $("#lista_repositorios").text("");

            var div = "<br><label>Nome do Repositório: </label>";
            div += "<p id='nome_repos_[[i]]'>[[value_name]]</p>";
            div += "<p id='views_repos_[[i]]'>[[value_views_count]]</p>";
            div += "<a id='views_repos_[[i]]' href='./detalhes.html?full_name=[[value_full_name]]'>Veja mais</a>";



            $.each(response, function (key, value) {
                var eachDiv = div.replaceAll("[[i]]", key);
                eachDiv = eachDiv.replace("[[value_name]]", value.name);
                eachDiv = eachDiv.replace("[[value_views_count]]", value.watchers_count);
                eachDiv = eachDiv.replace("[[value_full_name]]", value.full_name);
                $("#lista_repositorios").append(eachDiv);
            });
        }
    })


}





/*
$.route("", (e, params, query) => {
    console.log(query); // -> { h: 'Hello World' }
}); */

const urlParams = new URLSearchParams(window.location.search);

const myParam = urlParams.get('full_name');

console.log(myParam)

function buscaRepositorio() {


    const urlFullName = `https://api.github.com/repos/${myParam}`;


    $.ajax({
        type: 'GET',
        url: urlFullName,
        success: function (response) {
            console.log(response)


            $('#nome_repositorio').text(response.name);
            $('#descricao_repositorio').text(response.description);
            $('#link_repositorio').attr('href', response.html_url);
            $('#numero_de_estrelas_repositorio').text(response.stargazers_count);
            $('#linguagem_repositorio').text(response.language);
        },
        error: function () {
            $('#respositotio_n_encrontrado').text("Não foi encontrado");
            $('#respositotio_n_encrontrado').css('display', 'block');
        }
    })
}


