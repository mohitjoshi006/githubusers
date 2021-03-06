$(document).ready(function(){
    $('#searchUser').on('keyup', function(e){
      let username = e.target.value;
  
      // Make request to Github
      $.ajax({
          url:'https://api.github.com/users/'+username,
          data:{
            client_id:'a1ea9902dee092b9bc3b',
            client_secret:'3b5a0ded61c60153324162025687d7581c55c431'
          }
      }).done(function(user){
        $.ajax({
          url:'https://api.github.com/users/'+username+'/repos',
          data:{
            client_id:'a1ea9902dee092b9bc3b',
            client_secret:'3b5a0ded61c60153324162025687d7581c55c431',
            sort: 'created: asc',
            per_page: 5
          }
        }).done(function(repos){
          $.each(repos, function(index, repo){
            $('#repos').append(`
              <div class="card">
                <div class="row">
                  <div class="col-md-7">
                    <strong>${repo.name}</strong>: ${repo.description}
                  </div>
                  <div class="col-md-3">
                    <span class="badge badge-dark">Forks: ${repo.forks_count}</span>
                    <span class="badge badge-primary">Watchers: ${repo.watchers_count}</span>
                    <span class="badge badge-success">Stars: ${repo.stargazers_count}</span>
                  </div>
                  <div class="col-md-2">
                    <a href="${repo.html_url}" target="_blank" class="btn btn-dark">Repo Page</a>
                  </div>
                </div>
              </div>
            `);
          });
        });
        $('#profile').html(`
          <div class="card border-primary mb-3" style="max-width: 100rem;">
            <div class="card-header"><h3> <b>${user.name} </b></h3></div>
            <div class="card-body">
              <div class="row">
              <div class="col-md-3">
                <img class="img-thumbnail avatar" src="${user.avatar_url}">
                <a target="_blank" class="btn btn-primary btn-block" href="${user.html_url}">View Profile</a>
              </div>
              <div class="col-md-9">
                <span class="badge badge-dark">Public Repos: ${user.public_repos}</span>
                <span class="badge badge-primary">Public Gists: ${user.public_gists}</span>
                <span class="badge badge-success">Followers: ${user.followers}</span>
                <span class="badge badge-info">Following: ${user.following}</span>
                <br><br>
                <ul class="list-group">
                  <li class="list-group-item"> <b> Company: </b> ${user.company}</li>
                  <li class="list-group-item"> <b>Website/blog:</b> <a href="${user.blog}" target="_blank">${user.blog}</a></li>
                  <li class="list-group-item"> <b> Location: </b> ${user.location}</li>
                  <li class="list-group-item"> <b> Bio:</b> ${user.bio}</li>
                  <li class="list-group-item"> <b>Member Since: </b> ${user.created_at}</li>

                </ul>
                </div>
              </div>
            </div>
          </div>
          <h3 class="page-header">Latest Repos</h3>
          <div id="repos"></div>
          `);
      });
    });
  });