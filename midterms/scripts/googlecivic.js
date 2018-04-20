
        /**
         * Build and execute request to look up voter info for provided address.
         * @param {string} address Address for which to fetch voter info.
         * @param {function(Object)} callback Function which takes the
         *     response object as a parameter.
         */
        function lookupPoll(address, callback) {
            /**
              * Election ID for which to fetch voter info.
              * @type {number}
              */
            var electionId = 2000;

            /**
             * Request object for given parameters.
             * @type {gapi.client.HttpRequest}
             */
            var req = gapi.client.request({
                'path': '/civicinfo/v2/voterinfo',
                'params': { 'electionId': electionId, 'address': address }
            });
            req.execute(callback);
        }

        function lookupRep(address, callback) {
            /**
              * Election ID for which to fetch voter info.
              * @type {number}
              */
            var electionId = 2000;

            /**
             * Request object for given parameters.
             * @type {gapi.client.HttpRequest}
             */
            var req = gapi.client.request({
                'path': '/civicinfo/v2/representatives',
                'params': {
                    'address': address, 'includeOffices': true, 'levels': 'country', 'roles': 'legislatorUpperBody' }
            });
            req.execute(callback);
        }

        /**
         * Render results in the DOM.
         * @param {Object} response Response object returned by the API.
         * @param {Object} rawResponse Raw response from the API.
         */


        function renderResultsPoll(response, rawResponse) {
            var el = document.getElementById('resultsPoll');
            if (!response || response.error) {
                el.appendChild(document.createTextNode(
                    'Error while trying to fetch polling place'));
                return;
            }
            var normalizedAddress = response.normalizedInput.line1 + "<br/>" +
                response.normalizedInput.city + ', ' +
                response.normalizedInput.state + ' ' +
                response.normalizedInput.zip;
            if (response.pollingLocations.length > 0) {
                var pollingLocation = response.pollingLocations[0].address;
                var pollingAddress = pollingLocation.locationName + "<br/>" +
                    pollingLocation.line1 + "<br/>" +
                    pollingLocation.city + ", " +
                    pollingLocation.state + " " +
                    pollingLocation.zip;
                var normalizedAddress = "<p><b>Address entered:</b><br/> " + normalizedAddress + "</p>";
                var pollResults = "<p><b>" + 'Your polling place:</b><br/>' +
                    pollingAddress + "</p>";
                document.getElementById("resultsAddress").innerHTML = normalizedAddress;
                document.getElementById("resultsPoll").innerHTML = pollResults;
            } else {
                el.appendChild(document.createTextNode(
                    'Could not find polling place for ' + normalizedAddress));
            }
        } // end renderResultsPoll


        function renderResultsRep(response, rawResponse) {
            var el = document.getElementById('resultsRep');
            if (!response || response.error) {
                el.appendChild(document.createTextNode(
                    'Error while trying to fetch representatives'));
                return;
            }
            var normalizedAddress = response.normalizedInput.line1 + ' ' +
                response.normalizedInput.city + ', ' +
                response.normalizedInput.state + ' ' +
                response.normalizedInput.zip;
            if (response.kind.length > 0) {
                var rep1Name = response.officials[0].name;
                var rep1Party = response.officials[0].party;
                var rep1Link = response.officials[0].urls;
                var rep1Photo = response.officials[0].photoUrl;
                var rep2Name = response.officials[1].name;
                var rep2Party = response.officials[1].party;
                var rep2Link = response.officials[1].urls;
                var rep2Photo = response.officials[1].photoUrl;
                var repResults =
                    "<p><b>Your representatives: </b><br/>" +
                    "<img src='" + rep1Photo + "'/><br/>" +
                    "<a href='" + rep1Link + "'>" + rep1Name + "</a><br/>" + rep1Party + "<br/><br/>" +
                    "<img src='" + rep2Photo + "'/><br/>" +
                    "<a href='" + rep2Link + "'>" + rep2Name + "</a><br/>" + rep2Party + "</p>";
                document.getElementById("resultsRep").innerHTML = repResults;
            } else {
                el.appendChild(document.createTextNode(
                    'Could not find representatives for ' + normalizedAddress));
            }
        } // end renderResultsRep



        function displayContent() {
            //var inputAddr = document.getElementsByName("address")[0].value;
            var inputAddr = document.getElementsByName("addrStreet")[0].value +
                document.getElementsByName("addrCity")[0].value + ', ' +
                document.getElementsByName("addrState")[0].value + ' ' +
                document.getElementsByName("addrZip")[0].value;

            gapi.client.setApiKey('');
            lookupPoll(inputAddr, renderResultsPoll);
            lookupRep(inputAddr, renderResultsRep);
        }
