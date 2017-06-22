/* Author: ShaoZhengjiang <shaozhengjiang@gmail.com> */

;(function($){
    "use restrict";

    /* Refresh the file table asynchronously */
    $("#refresh-file-table").click(function(){
        // Show loading animation.
        var ajax_load = '<div class="text-center">' +
            '<img src="/static/img/broken-circle.gif" alg="Loading..."/></div>';
        $("#file-table").html(ajax_load);

        // Get new file table using ajax.
        $.get(window.location.pathname, {}, function(data, textStatus){
            var file_table_html = $(data).find("#file-table").html();
            $("#file-table").html(file_table_html);

            // Re-render time stamps using moment api.
            moment.locale("en");

            function flask_moment_render(elem) {
                $(elem).text(eval('moment("' + $(elem).data('timestamp') + '").' +
                                  $(elem).data('format') + ';'));
                $(elem).removeClass('flask-moment').show();
            }

            function flask_moment_render_all() {
                $('.flask-moment').each(function() {
                    flask_moment_render(this);
                    if ($(this).data('refresh')) {
                        (function(elem, interval) {
                            setInterval(function() { flask_moment_render(elem) }, interval);
                        })(this, $(this).data('refresh'));
                    }
                })
            }

            flask_moment_render_all();
        });
    });


    /* Panel collapse */
    $(document).on('click.kyn', '[data-toggle=collapse]', function() {
        $this = $(this);
        $i = $this.find('i');

        if ($.support.transition) {
            // When open panel body.
            if ($i.hasClass('rotate-icon') && !$i.hasClass('rotate-anticlockwise')) {
                $i.addClass('rotate-anticlockwise');
            // When close panel body.
            } else if ($i.hasClass('rotate-icon') && $i.hasClass('rotate-anticlockwise')) {
                $i.removeClass('rotate-anticlockwise');
            }
        // For browsers not supporting CSS3
        } else {  
            var down = 'fa-arrow-circle-o-down';
            var right = 'fa-arrow-circle-o-right';

            if ($.hasClass(down)) {
                $i.removeClass(down);
                $i.addClass(right);
            } else {
                $i.removeClass(right);
                $i.addClass(down);
            }
        }
    });

    /* Disable reactions */
    $('#disable-rxns').on('click.kyn', function() {
        $('.rxn-table input:checkbox:checked').each(function () {
            $tr = $(this).parents('tr')
            if (!$tr.hasClass('disabled')) {
                $tr.addClass('disabled');
            }
        });
    });

    /* Recover disabled reactions */
    $('#recover-rxns').on('click.kyn', function() {
        $('.rxn-table input:checkbox:checked').each(function() {
            $tr = $(this).parents('tr');
            if ($tr.hasClass('disabled')) {
                $tr.removeClass('disabled');
            }
        });
    });

    /* Delete selected reactions */
    $('#delete-rxns').on('click.kyn', function() {
        $('.rxn-table input:checkbox:checked').each(function() {
            $(this).parents('tr').remove();
        });
    })

})(jQuery);

