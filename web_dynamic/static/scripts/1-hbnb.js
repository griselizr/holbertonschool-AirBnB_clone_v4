$('document').ready(function () {
    const amenities = {};
    $(':checkbox').change(function () {
        if ($(this).is(':checked')) {
            amenities[$(this).data('id')] = $(this).data('name');
        }
        else {
            delete amenities[$(this).data('id')];
        }
        if ($.isEmptyObject(amenities)) {
            $('.amenities h4').html('&nbsp');
        }
        else {
            console.log("This is a test...", amenities);
            $('amenities h4').text(Object.values(amenities).join(", "));
        }
    });
});