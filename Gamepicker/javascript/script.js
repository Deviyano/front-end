document.addEventListener("DOMContentLoaded", function() {
    var  games = [
        {
            "title": "Counter-Strike: Global Offensive",
            "price": 0.00,
            "genre": "FPS",
            "rating": 4
        },
        {
            "title": "Dota 2",
            "price": 0.00,
            "genre": "MOBA",
            "rating": 3
        },
        {
            "title": "Goose Goose Duck",
            "price": 4.99,
            "genre": "Action",
            "rating": 2
        },
        {
            "title": "Apex Legends",
            "price": 0.00,
            "genre": "FPS",
            "rating": 4
        },
        {
            "title": "PUBG: BATTLEGROUNDS",
            "price": 29.99,
            "genre": "FPS",
            "rating": 5
        },
        {
            "title": "Lost Ark",
            "price": 49.99,
            "genre": "Action",
            "rating": 1
        },
        {
            "title": "Grand Theft Auto V",
            "price": 29.99,
            "genre": "FPS",
            "rating": 3
        },
        {
            "title": "Call of Duty®: Modern Warfare® II | Warzone™ 2.0",
            "price": 19.99,
            "genre": "FPS",
            "rating": 3
        },
        {
            "title": "Team Fortress 2",
            "price": 0.00,
            "genre": "FPS",
            "rating": 5
        },
        {
            "title": "Rust",
            "price": 39.99,
            "genre": "Action",
            "rating": 5
        },
        {
            "title": "Unturned",
            "price": 0.00,
            "genre": "RPG",
            "rating": 1
        },
        {
            "title": "ELDEN RING",
            "price": 59.99,
            "genre": "RPG",
            "rating": 5
        },
        {
            "title": "ARK: Survival Evolved",
            "price": 10.00,
            "genre": "RPG",
            "rating": 1
        },
        {
            "title": "War Thunder",
            "price": 0.00,
            "genre": "Simulation",
            "rating": 2
        },
        {
            "title": "Sid Meier's Civilization VI",
            "price": 29.99,
            "genre": "Simulation",
            "rating": 3
        },
        {
            "title": "Football Manager 2023",
            "price": 59.99,
            "genre": "Simulation",
            "rating": 3
        },
        {
            "title": "Warframe",
            "price": 0.00,
            "genre": "Looter-shooter",
            "rating": 3
        },
        {
            "title": "EA SPORTS™ FIFA 23",
            "price": 59.99,
            "genre": "Sport",
            "rating": 1
        },
        {
            "title": "Destiny 2",
            "price": 0.00,
            "genre": "FPS",
            "rating": 5
        },
        {
            "title": "Red Dead Redemption 2",
            "price": 59.99,
            "genre": "RPG",
            "rating": 4
        },
        {
            "title": "Tom Clancy's Rainbow Six Siege",
            "price": 19.99,
            "genre": "Simulation",
            "rating": 3
        },
        {
            "title": "The Witcher 3: Wild Hunt",
            "price": 39.99,
            "genre": "RPG",
            "rating": 4
        },
        {
            "title": "Terraria",
            "price": 9.99,
            "genre": "Sandbox",
            "rating": 2
        },
        {
            "title": "Stardew Valley",
            "price": 14.99,
            "genre": "Sandbox",
            "rating": 1
        },
        {
            "title": "Left 4 Dead 2",
            "price": 9.99,
            "genre": "FPS",
            "rating": 4
        },
        {
            "title": "Don't Starve Together",
            "price": 5.09,
            "genre": "RPG",
            "rating": 3
        },
        {
            "title": "MIR4",
            "price": 19.99,
            "genre": "RPG",
            "rating": 3
        },
        {
            "title": "PAYDAY 2",
            "price": 9.99,
            "genre": "Action",
            "rating": 2
        },
        {
            "title": "Path of Exile",
            "price": 0.00,
            "genre": "RPG",
            "rating": 4
        },
        {
            "title": "Project Zomboid",
            "price": 14.99,
            "genre": "Simulation",
            "rating": 4
        },
        {
            "title": "Valheim",
            "price": 19.99,
            "genre": "Sandbox",
            "rating": 5
        },
        {
            "title": "DayZ",
            "price": 44.99,
            "genre": "Simulation",
            "rating": 3
        },
        {
            "title": "Cult of the lamb",
            "price": 10.99,
            "genre": "Action",
            "rating": 4
        }
    ]
    //-------------------list--------------------

    var gameLog = document.querySelector('.Game_log');
    var cartItems = document.querySelector('.cart-items');

    function handleCheckboxChange(checkbox) {
        var gameItem = checkbox.closest('.game-item');
        var gameTitle = gameItem.querySelector('.title-box p').textContent;
        var gamePrice = gameItem.querySelector('.price').textContent;

        if (checkbox.checked) {
            var cartItem = document.createElement('li');
            cartItem.textContent = gameTitle + ' - ' + gamePrice;
            cartItems.appendChild(cartItem);

            // Add event listener to cart item for removing on click
            cartItem.addEventListener('click', function() {
                cartItems.removeChild(cartItem);
                checkbox.checked = false;
                updateTotalPrice();
            });
        } else {
            var items = cartItems.getElementsByTagName('li');
            for (var i = 0; i < items.length; i++) {
                if (items[i].textContent === gameTitle + ' - ' + gamePrice) {
                    cartItems.removeChild(items[i]);
                    break;
                }
            }
        }

        updateTotalPrice();
    }

    gameLog.addEventListener('change', function(event) {
        if (event.target.classList.contains('select-checkbox')) {
            handleCheckboxChange(event.target);
        }
    });

    gameLog.addEventListener('click', function(event) {
        if (event.target.closest('.title-box')) {
            var checkbox = event.target.closest('.game-item').querySelector('.select-checkbox');
            checkbox.checked = !checkbox.checked;
            handleCheckboxChange(checkbox);
        }
    });

    function applyFilters() {
        var priceFilter = parseFloat(document.getElementById('priceInput').value);
        var genreFilter = document.getElementById('genreSelect').value;
        var ratingFilter = parseFloat(document.getElementById('ratingInput').value);

        var filteredGames = games.filter(function(game) {
            var passesPriceFilter = isNaN(priceFilter) || game.price <= priceFilter;
            var passesGenreFilter = genreFilter === '' || game.genre === genreFilter;
            var passesRatingFilter = isNaN(ratingFilter) || game.rating <= ratingFilter;

            return passesPriceFilter && passesGenreFilter && passesRatingFilter;
        });

        renderGames(filteredGames);
    }

    function renderGames(gamesList) {
        gameLog.innerHTML = '';

        gamesList.forEach(function(game) {
            var gameTitle = game.title;
            var gamePrice = game.price.toFixed(2);

            var container = document.createElement('div');
            container.classList.add('game-item');

            var checkboxContainer = document.createElement('div');
            checkboxContainer.classList.add('checkbox-title-container');

            var checkbox_css = document.createElement('div');
            checkbox_css.classList.add('checkbox-container');

            var checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.classList.add('select-checkbox');

            checkbox_css.appendChild(checkbox);
            checkboxContainer.appendChild(checkbox_css);

            var titleBox = document.createElement('div');
            titleBox.classList.add('title-box');

            var titleText = document.createElement('p');
            titleText.textContent = gameTitle;

            var priceText = document.createElement('p');
            priceText.textContent = '$' + gamePrice;
            priceText.classList.add('price');

            titleBox.appendChild(titleText);
            titleBox.appendChild(priceText);

            checkboxContainer.appendChild(titleBox);

            container.appendChild(checkboxContainer);

            gameLog.appendChild(container);
        });
    }

    document.querySelector('button').addEventListener('click', applyFilters);

    function calculateTotalPrice() {
        var totalPrice = 0;

        cartItems.querySelectorAll('li').forEach(function(item) {
            var priceString = item.textContent.split(' - ')[1].substring(1); // Remove '$' and split on '-'
            var price = parseFloat(priceString);
            totalPrice += price;
        });

        return totalPrice.toFixed(2);
    }

    document.getElementById('showCartButton').addEventListener('click', function() {
        var shoppingCart = document.querySelector('.shopping-cart');
        var gameLogContainer = document.querySelector('.Game_log');
        var filterContainer = document.querySelector('.filter-container');

        shoppingCart.style.display = 'block';
        gameLogContainer.style.display = 'none';
        filterContainer.style.display = 'none';

        var totalPrice = calculateTotalPrice();
        document.getElementById('totalPrice').textContent = 'Total: $' + totalPrice;
    });

    function returnToGamePicker() {
        var shoppingCart = document.querySelector('.shopping-cart');
        var gameLogContainer = document.querySelector('.Game_log');
        var filterContainer = document.querySelector('.filter-container');

        shoppingCart.style.display = 'none';
        gameLogContainer.style.display = 'block';
        filterContainer.style.display = 'block';
    }

    document.getElementById('returnToGamePickerButton').addEventListener('click', returnToGamePicker);

    function updateTotalPrice() {
        var totalPrice = calculateTotalPrice();
        document.getElementById('totalPrice').textContent = 'Total: $' + totalPrice;
    }

    // Initial rendering of all games
    renderGames(games);
});