<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">
    <link rel="icon" href="/img/favicon.ico" type="image/x-icon" />
    <link rel="shortcut icon" href="/img/favicon.ico" type="image/x-icon" />

    <title>MongoMart - Locations</title>

    <!-- Bootstrap Core CSS -->
    <link href="/static/css/bootstrap.min.css" rel="stylesheet">

    <!-- Custom CSS -->
    <link href="/static/css/shop-homepage.css" rel="stylesheet">

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
    <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->

</head>

<body>

% # Include navigation
%include('includes/nav.tpl')

<!-- Page Content -->
<div class="container">

    <div class="row">
        <div class="col-md-12">
            <ol class="breadcrumb">
                <li><a href="/">Home</a></li>
                <li>Locations</li>
            </ol>
        </div>
    </div>
    <!-- /.row -->

    <div class="row">
        <div class="col-md-12">
            <h2>Store Locator</h2>
            <p>Find the store closest to you.</p>
            % if zip_error:
            <div class="alert alert-danger">
                {{zip_error}}
            </div>
            % end
            <form class="form">
                <div class="form-group{{' has-error' if zip_error else ''}}">
                    <label class="control-label" for="zip">Zip code</label>
                    <input type="text" class="form-control" name="zip" id="zip" value="{{zip}}"/>
                </div>
                <div class="form-group">
                    <input type="hidden" name="find" value="byZip"/>
                    <button type="submit" class="btn btn-primary">Find stores by zip</button>
                </div>
            </form>
            % if city_and_state_error:
            <div class="alert alert-danger">
                 {{city_and_state_error}}
            </div>
            % end
            <form class="form">
                <div class="form-group<#if cityAndStateError??> has-error</#if>">
                    <label class="control-label" for="city">City</label>
                    <input type="text" class="form-control" name="city" id="city" value="{{city}}"/>
                </div>
                <div class="form-group{{' has-error' if city_and_state_error else ''}}">
                    <label for="state">State</label>
                    <select class="form-control" name="state" id="state">
                      <option>Choose one</option>
                      % for st in states:
                      % if st == state:
                        <option value="{{st}}" selected>{{st}}</option>
                      % else:
                      <option value="{{st}}">{{st}}</option>
                      % end
                      % end
                    </select>
                </div>
                <div class="form-group">
                    <input type="hidden" name="find" value="byCityAndState"/>
                    <button type="submit" class="btn btn-primary">Find stores by city &amp; state</button>
                </div>
            </form>


            <!-- row -->
            % for store in stores:

            <div class="row">
                <div class="col-md-12">
                    <h3>{{store['name']}}</h3>
                    <address>
                        <strong>{{store['name']}}</strong><br/>
                        {{store['address']}}<br/>
                        % if store['address2']:
                        {{store['address2']}}<br/>
                        % end
                        {{store['city']}}, {{store['state']}} {{store['zip']}}<br/>
                        {{store['country']}}<br/>
                    </address>
                    <!-- only show distance for zip searches -->
                    % if find == "byZip":
                    <strong>Distance: {{store['distance_from_point']}} km</strong>
                    % end
                </div>
            </div>
            <!-- /.row -->

            <hr/>

            % end
            <!-- /.row -->

            % if len(stores) > 0:
            <!-- Pagination -->
            <div class="row text-center">
                <div class="col-lg-12">
                    <ul class="pagination">
                    % for i in xrange(num_pages):
                        <li {{'class="active"' if page == i else ''}}>
                            <a href="?page={{i}}&amp;city={{city}}&amp;state={{state}}&amp;zip={{zip}}&amp;find={{find}}">{{i+1}}</a>
                        </li>
                    % end
                    </ul>
                </div>
            </div>
            % end

            <div style="text-align:center;">
                <i>{{num_stores}} Stores</i>
            </div>

            <!-- /.row -->
        </div>



    </div>

</div>
<!-- /.container -->

% # Include footer
%include('includes/footer.tpl')

</body>

</html>
