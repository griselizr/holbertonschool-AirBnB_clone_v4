//const $ = window.$;
const amenities = {};
$(document).ready(function () {
    $(':checkbox').change(function () {
        if (this.checked) {
            amenities[$(this).data('id')] = $(this).data('name');
        }
        else {
            delete amenities[$(this).data('id')];
        }
        console.log(amenities);
        $('.amenities h4').text(Object.values(amenities).join(", "));
    });
    $('button').click(function () {
        //$('.places > article').empty();
        console.log(amenities)
        console.log('this is a test')
        $.ajax({
            type: 'POST',
            url: 'http://0.0.0.0:5001/api/v1/places_search/',
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify({ amenities: Object.keys(amenities) }),
            success: function (data, status) {
                for (const object in data) {
                    let display;
                    const titleBox = `<article><div class="title_box"><h2>${data[object].name}</h2><div class="price_by_night">$${data[object].price_by_night}</div></div>`;
                    display = (data[object].max_guest > 1) ? 'Guests' : 'Guest';
                    const infoGuest = `<div class="information"><div class="max_guest">${data[object].max_guest} ${display}</div>`;
                    display = (data[object].number_rooms > 1) ? 'Bedrooms' : 'Bedroom';
                    const infoRoom = `<div class="number_rooms">${data[object].number_rooms} ${display}</div>`;
                    display = (data[object].number_bathrooms > 1) ? 'Bathrooms' : 'Bathroom';
                    const infoBath = `<div class="number_bathrooms">${data[object].number_bathrooms} ${display}</div></div>`;
                    const desc = `<div class="description">${data[object].description}</div></article>`;
                    const finalHtml = titleBox + infoGuest + infoRoom + infoBath + desc;
                    $('SECTION.places').append(finalHtml);
                }
            }
        });
    });
});

$.get('http://0.0.0.0:5001/api/v1/status/', function (data) {
    if (data.status === 'OK') {
        $('div#api_status').addClass('available');
    } else {
        $('div#api_status').removeClass('available');
    }
});

$.ajax({
    type: 'POST',
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    contentType: 'application/json; charset=utf-8',
    dataType: 'json',
    data: '{}',
    success: function (data, status) {
        for (const object in data) {
            let display;
            const titleBox = `<article><div class="title_box"><h2>${data[object].name}</h2><div class="price_by_night">$${data[object].price_by_night}</div></div>`;
            display = (data[object].max_guest > 1) ? 'Guests' : 'Guest';
            const infoGuest = `<div class="information"><div class="max_guest">${data[object].max_guest} ${display}</div>`;
            display = (data[object].number_rooms > 1) ? 'Bedrooms' : 'Bedroom';
            const infoRoom = `<div class="number_rooms">${data[object].number_rooms} ${display}</div>`;
            display = (data[object].number_bathrooms > 1) ? 'Bathrooms' : 'Bathroom';
            const infoBath = `<div class="number_bathrooms">${data[object].number_bathrooms} ${display}</div></div>`;
            const desc = `<div class="description">${data[object].description}</div></article>`;
            const finalHtml = titleBox + infoGuest + infoRoom + infoBath + desc;
            $('SECTION.places').append(finalHtml);
        }
    }
});
