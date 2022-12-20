$(document).ready(function () {
    const amenities = {};
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
});