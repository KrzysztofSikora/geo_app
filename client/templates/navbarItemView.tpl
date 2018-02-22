<div class="navbar navbar-default navbar-fixed-top" role="navigation">
    <div class="navbar-header">
        <div class="container">
            <a class="navbar-brand" href="/">Geo application</a>
            <div id="header-alert" class="alert alert-success col-md-7 navbar-button" style="display:none;"></div>
            <% if(logged_in){ %>
                <ul id="headerlinks" class="nav navbar-nav navbar-left">
                    <a href="#/map">Map</a>
                    <a href="#/points">Points</a>
                    <a href="#/contents">Contents</a>
                    <a href="#/todos">Todos</a>
                    <a href="#/about">About</a>
                    <a href="#/users">Users</a>
                </ul>
                <ul class="nav navbar-nav navbar-right">
                    <li class="dropdown">
                        <a class="dropdown-toggle" data-toggle="dropdown" href="#"><%= user.username %> <b class="caret"></b></a>
                        <ul class="dropdown-menu">
                            <li><a id="logout-link" href="#" data-bypass>Sign Out</a></li>
                            <li><a id="remove-account-link" href="#" data-bypass>Remove Account</a></li>
                        </ul>
                    </li>
                </ul>
            <% } %>
        </div>
    </div>
</div>
