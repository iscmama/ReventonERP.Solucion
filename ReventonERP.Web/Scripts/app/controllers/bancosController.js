(function () {
    'use strict';

    angular
        .module('reventonERPApp')
        .controller('bancosController', bancosController);

    bancosController.$inject = ['$scope', 'securityFactory', '$log', '$window', '$sessionStorage', '$q', 'operationsFactory'];

    function bancosController($scope, securityFactory, $log, $window, $sessionStorage, $q, operationsFactory) {
        var full = $q.defer();
        loadPage();

        function loadPage() {

            $scope.banco = {};
            $scope.editarBanco = false;
            $scope.fechaPagoAsigna = null;

            $scope.reporteFactura = {
                factura: '',
                fechaFactura: null,
                numeroCheque: '',
                fechaPago: null,
                proveedor: '',
                tasaCero: '',
                excentos: '',
                compras: '',
                gastos: '',
                ivaCompras: '',
                ivaGastos: '',
                retencionISR: '',
                retencionIVA: '',
                total: ''
            };

            operationsFactory.obtenerBancos()
                .then(function (data) {
                    $scope.bancos = data;

                    if ($scope.bancos.data.Bancos.length > 0) {

                        $scope.myTable =
                            $('#dynamic-table')
                                //.wrap("<div class='dataTables_borderWrap' />")   //if you are applying horizontal scrolling (sScrollX)
                                .DataTable({
                                    bAutoWidth: false,


                                    data: $scope.bancos.data.Bancos,
                                    columns: [

                                        { defaultContent: '<label class="pos-rel"><input type="checkbox" class="ace" /><span class="lbl"></span></label>', bSortable: 'false' },

                                        { data: "numero" },
                                        { data: "fechaPago" },
                                        { data: "proveedor" },
                                        { data: "referencia" },
                                        { data: "fechaFactura" },
                                        { data: "depositos" },
                                        { data: "cargos" },
                                        { data: "saldo" },
                                        { data: "estatus" },

                                        {
                                            defaultContent: '<div class="hidden-sm hidden-xs action-buttons"><a class="blue" href="#" id="btnVerBanco"><i class="ace-icon fa fa-search-plus bigger-130"></i> </a><a class="green" href="#" id="btnEditarBanco"><i class="ace-icon fa fa-pencil bigger-130"></i> </a> <a class="red" href="#" id="id-btn-dialog2"><i class="ace-icon fa fa-trash-o bigger-130"></i> </a> </div>' +
                                            '<div class="hidden-md hidden-lg"><div class="inline pos-rel"><button class="btn btn-minier btn-yellow dropdown-toggle" data-toggle="dropdown" data-position="auto"><i class="ace-icon fa fa-caret-down icon-only bigger-120"></i> </button><ul class="dropdown-menu dropdown-only-icon dropdown-yellow dropdown-menu-right dropdown-caret dropdown-close"><li> <a href="#" class="tooltip-info" data-rel="tooltip" title="View" id="btnVerBanco"> <span class="blue"> <i class="ace-icon fa fa-search-plus bigger-120"></i></span>   </a> </li> <li> <a href="#" class="tooltip-success" data-rel="tooltip" title="Edit"> <span class="green"><i class="ace-icon fa fa-pencil-square-o bigger-120"></i></span></a></li><li><a href="#" id="id-btn-dialog2"> <span class="red"><i class="ace-icon fa fa-trash-o bigger-120"></i></span></a> </li> </ul></div></div>', bSortable: 'false'
                                        }

                                    ],

                                    columnDefs: [
                                        { targets: [2, 5], render: function (data, type, row) { return moment(data).format("DD/MM/YYYY"); } },
                                        {
                                            targets: [6, 7, 8], render: function (data, type, row) {
                                                return formatCurrency(data, true);
                                            }
                                        }
                                    ],

                                    //"aoColumns": [
                                    //    { "bSortable": false },
                                    //    { "sName": "numero" },
                                    //    { "sName": "fechaPago" },
                                    //    { "sName": "proveedor" },
                                    //    { "sName": "referencia" },
                                    //    { "sName": "fechaFactura" },
                                    //    { "sName": "depositos" },
                                    //    { "sName": "cargos" },
                                    //    { "sName": "saldo" },
                                    //    { "sName": "estatus" },
                                    //    { "bSortable": false }
                                    //],
                                    //"aaSorting": [],


                                    //"bProcessing": true,
                                    //"bServerSide": true,
                                    //"ajaxSource": $scope.bancos.data,

                                    //,
                                    //"sScrollY": "200px",
                                    //"bPaginate": false,

                                    //"sScrollX": "100%",
                                    //"sScrollXInner": "120%",
                                    //"bScrollCollapse": true,
                                    //Note: if you are applying horizontal scrolling (sScrollX) on a ".table-bordered"
                                    //you may want to wrap the table inside a "div.dataTables_borderWrap" element

                                    //"iDisplayLength": 50


                                    select: {
                                        style: 'multi'
                                    }
                                });

                        $.fn.dataTable.Buttons.defaults.dom.container.className = 'dt-buttons btn-overlap btn-group btn-overlap';

                        new $.fn.dataTable.Buttons($scope.myTable, {
                            buttons: [
                                {
                                    "extend": "colvis",
                                    "text": "<i class='fa fa-search bigger-110 blue'></i> <span class='hidden'>Show/hide columns</span>",
                                    "className": "btn btn-white btn-primary btn-bold",
                                    columns: ':not(:first):not(:last)'
                                },
                                {
                                    "extend": "copy",
                                    "text": "<i class='fa fa-copy bigger-110 pink'></i> <span class='hidden'>Copy to clipboard</span>",
                                    "className": "btn btn-white btn-primary btn-bold"
                                },
                                {
                                    "extend": "csv",
                                    "text": "<i class='fa fa-database bigger-110 orange'></i> <span class='hidden'>Export to CSV</span>",
                                    "className": "btn btn-white btn-primary btn-bold"
                                },
                                {
                                    "extend": "excel",
                                    "text": "<i class='fa fa-file-excel-o bigger-110 green'></i> <span class='hidden'>Export to Excel</span>",
                                    "className": "btn btn-white btn-primary btn-bold"
                                },
                                {
                                    "extend": "pdf",
                                    "text": "<i class='fa fa-file-pdf-o bigger-110 red'></i> <span class='hidden'>Export to PDF</span>",
                                    "className": "btn btn-white btn-primary btn-bold"
                                },
                                {
                                    "extend": "print",
                                    "text": "<i class='fa fa-print bigger-110 grey'></i> <span class='hidden'>Print</span>",
                                    "className": "btn btn-white btn-primary btn-bold",
                                    autoPrint: false,
                                    message: 'This print was produced using the Print button for DataTables'
                                }
                            ]
                        });
                        $scope.myTable.buttons().container().appendTo($('.tableTools-container'));

                        //style the message box
                        var defaultCopyAction = $scope.myTable.button(1).action();
                        $scope.myTable.button(1).action(function (e, dt, button, config) {
                            defaultCopyAction(e, dt, button, config);
                            $('.dt-button-info').addClass('gritter-item-wrapper gritter-info gritter-center white');
                        });


                        var defaultColvisAction = $scope.myTable.button(0).action();
                        $scope.myTable.button(0).action(function (e, dt, button, config) {

                            defaultColvisAction(e, dt, button, config);


                            if ($('.dt-button-collection > .dropdown-menu').length == 0) {
                                $('.dt-button-collection')
                                    .wrapInner('<ul class="dropdown-menu dropdown-light dropdown-caret dropdown-caret" />')
                                    .find('a').attr('href', '#').wrap("<li />")
                            }
                            $('.dt-button-collection').appendTo('.tableTools-container .dt-buttons')
                        });

                        ////

                        setTimeout(function () {
                            $($('.tableTools-container')).find('a.dt-button').each(function () {
                                var div = $(this).find(' > div').first();
                                if (div.length == 1) div.tooltip({ container: 'body', title: div.parent().text() });
                                else $(this).tooltip({ container: 'body', title: $(this).text() });
                            });
                        }, 500);

                        $scope.myTable.on('select', function (e, dt, type, index) {
                            if (type === 'row') {
                                $($scope.myTable.row(index).node()).find('input:checkbox').prop('checked', true);
                            }
                        });
                        $scope.myTable.on('deselect', function (e, dt, type, index) {
                            if (type === 'row') {
                                $($scope.myTable.row(index).node()).find('input:checkbox').prop('checked', false);
                            }
                        });

                        /////////////////////////////////
                        //table checkboxes
                        $('th input[type=checkbox], td input[type=checkbox]').prop('checked', false);

                        //select/deselect all rows according to table header checkbox
                        $('#dynamic-table > thead > tr > th input[type=checkbox], #dynamic-table_wrapper input[type=checkbox]').eq(0).on('click', function () {
                            var th_checked = this.checked;//checkbox inside "TH" table header

                            $('#dynamic-table').find('tbody > tr').each(function () {
                                var row = this;
                                if (th_checked) $scope.myTable.row(row).select();
                                else $scope.myTable.row(row).deselect();
                            });
                        });

                        //select/deselect a row when the checkbox is checked/unchecked
                        $('#dynamic-table').on('click', 'td input[type=checkbox]', function () {
                            var row = $(this).closest('tr').get(0);
                            if (this.checked)
                                $scope.myTable.row(row).deselect();
                            else
                                $scope.myTable.row(row).select();
                        });

                        $(document).on('click', '#dynamic-table .dropdown-toggle', function (e) {
                            e.stopImmediatePropagation();
                            e.stopPropagation();
                            e.preventDefault();
                        });

                        $('#dynamic-table').on('click', '#id-btn-dialog2', function (e) {

                            e.stopImmediatePropagation();
                            e.stopPropagation();
                            e.preventDefault();

                            $("#dialog-confirm").removeClass('hide').dialog({
                                resizable: false,
                                width: '320',
                                modal: true,
                                title: "<div class='widget-header'><h4 class='smaller'><i class='ace-icon fa fa-exclamation-triangle red'></i> Confirmar eliminación</h4></div>",
                                title_html: true,
                                buttons: [
                                    {
                                        html: "<i class='ace-icon fa fa-trash-o bigger-110'></i>&nbsp; Si",
                                        "class": "btn btn-danger btn-minier",
                                        click: function () {
                                            $(this).dialog("close");
                                            $window.location.href = '/home/bancos';
                                        }
                                    }
                                    ,
                                    {
                                        html: "<i class='ace-icon fa fa-times bigger-110'></i>&nbsp; No",
                                        "class": "btn btn-minier",
                                        click: function () {
                                            $(this).dialog("close");
                                        }
                                    }
                                ]
                            });

                        });


                        $('#dynamic-table').on('click', '#btnVerBanco', function (e) {
                            
                            e.stopImmediatePropagation();
                            e.stopPropagation();
                            e.preventDefault();

                            var row = $(this).parents('tr')[0];
                            $scope.dataBanco = $scope.myTable.row(row).data();

                            $scope.banco = {
                                idBancos: $scope.dataBanco.idBancos,
                                numero: $scope.dataBanco.numero,
                                fechaPagoBanco: moment($scope.dataBanco.fechaPago).format("DD/MM/YYYY"),
                                proveedor: $scope.dataBanco.proveedor,
                                referencia: $scope.dataBanco.referencia,
                                fechaFacturaBanco: moment($scope.dataBanco.fechaFactura).format("DD/MM/YYYY"),
                                depositos: formatCurrency($scope.dataBanco.depositos, false),
                                cargos: formatCurrency($scope.dataBanco.cargos, false),
                                saldo: formatCurrency($scope.dataBanco.saldo, false),
                                fechaAlta: $scope.dataBanco.fechaAlta,
                                idUsuarioAlta: $scope.dataBanco.idUsuarioAlta,
                                fechaModificacion: $scope.dataBanco.fechaModificacion,
                                idUsuarioModificacion: $scope.dataBanco.idUsuarioModificacion,
                                estatus: $scope.dataBanco.estatus
                            };

                            $('#modalBanco').modal('show');
                            $scope.editarBanco = false;
                            $('#numero').focus();
                            $scope.$apply();
                        });

                        $('#dynamic-table').on('click', '#btnEditarBanco', function (e) {

                            var row = $(this).parents('tr')[0];
                            $scope.dataBanco = $scope.myTable.row(row).data();

                            e.stopImmediatePropagation();
                            e.stopPropagation();
                            e.preventDefault();

                            $scope.banco = {
                                idBancos: $scope.dataBanco.idBancos,
                                numero: $scope.dataBanco.numero,
                                fechaPagoBanco: moment($scope.dataBanco.fechaPago).format("DD/MM/YYYY"),
                                proveedor: $scope.dataBanco.proveedor,
                                referencia: $scope.dataBanco.referencia,
                                fechaFacturaBanco: moment($scope.dataBanco.fechaFactura).format("DD/MM/YYYY"),
                                depositos: formatCurrency($scope.dataBanco.depositos, false),
                                cargos: formatCurrency($scope.dataBanco.cargos, false),
                                saldo: formatCurrency($scope.dataBanco.saldo, false),
                                fechaAlta: $scope.dataBanco.fechaAlta,
                                idUsuarioAlta: $scope.dataBanco.idUsuarioAlta,
                                fechaModificacion: $scope.dataBanco.fechaModificacion,
                                idUsuarioModificacion: $scope.dataBanco.idUsuarioModificacion,
                                estatus: $scope.dataBanco.estatus
                            };

                            $("#fechaPagoBanco").datepicker({
                                showOtherMonths: true,
                                selectOtherMonths: false,
                                dateFormat: 'dd/mm/yy'
                            });

                            $("#fechaFacturaBanco").datepicker({
                                showOtherMonths: true,
                                selectOtherMonths: false,
                                dateFormat: 'dd/mm/yy'
                            });

                            $('#modalBanco').modal('show');
                            $scope.editarBanco = true;
                            $('#numero').focus();
                            $scope.$apply();
                        });

                    }
                    else {
                        $scope.myTable = $('#dynamic-table').DataTable({ destroy: true });
                    }

                })
                .catch(function (error) {

                    $log.error(error);

                    if (error.data.status == 500) {
                        $scope.process = false;
                        $scope.isDisabled = false;
                    }

                    full.resolve();
                });

            $("#fechaFactura").datepicker({
                showOtherMonths: true,
                selectOtherMonths: false,
                dateFormat: 'dd/mm/yy'
            });

            $("#fechaPago").datepicker({
                showOtherMonths: true,
                selectOtherMonths: false,
                dateFormat: 'dd/mm/yy'
            });

            $('#id-input-file-1 , #id-input-file-2').ace_file_input({
                no_file: 'Sin archivo ...',
                btn_choose: 'Subir',
                btn_change: 'Cambiar',
                droppable: false,
                onchange: null,
                thumbnail: false, //| true | large
                whitelist: 'xls|xlsx'
                //blacklist:'exe|php'
                //onchange:''
                //
            });
            //pre-show a file name, for example a previously selected file
            //$('#id-input-file-1').ace_file_input('show_file_list', ['myfile.txt'])


            $('#id-input-file-3').ace_file_input({
                style: 'well',
                btn_choose: 'Coloque el archivo aquí o haga clic para elegir',
                btn_change: null,
                no_icon: 'ace-icon fa fa-cloud-upload',
                droppable: true,
                thumbnail: 'small'//large | fit
                //,icon_remove:null//set null, to hide remove/reset button
                /**,before_change:function(files, dropped) {
                    //Check an example below
                    //or examples/file-upload.html
                    return true;
                }*/
                /**,before_remove : function() {
                    return true;
                }*/
                ,
                preview_error: function (filename, error_code) {
                    //name of the file that failed
                    //error_code values
                    //1 = 'FILE_LOAD_FAILED',
                    //2 = 'IMAGE_LOAD_FAILED',
                    //3 = 'THUMBNAIL_FAILED'
                    //alert(error_code);
                }

            }).on('change', function () {
                //console.log($(this).data('ace_input_files'));
                //console.log($(this).data('ace_input_method'));
            });

            //$('#id-input-file-3')
            //.ace_file_input('show_file_list', [
            //{type: 'image', name: 'name of image', path: 'http://path/to/image/for/preview'},
            //{type: 'file', name: 'hello.txt'}
            //]);

            //dynamically change allowed formats by changing allowExt && allowMime function
            $('#id-file-format').removeAttr('checked').on('change', function () {
                var whitelist_ext, whitelist_mime;
                var btn_choose
                var no_icon
                if (this.checked) {
                    btn_choose = "Drop images here or click to choose";
                    no_icon = "ace-icon fa fa-picture-o";

                    whitelist_ext = ["jpeg", "jpg", "png", "gif", "bmp"];
                    whitelist_mime = ["image/jpg", "image/jpeg", "image/png", "image/gif", "image/bmp"];
                }
                else {
                    btn_choose = "Drop files here or click to choose";
                    no_icon = "ace-icon fa fa-cloud-upload";

                    whitelist_ext = null;//all extensions are acceptable
                    whitelist_mime = null;//all mimes are acceptable
                }
                var file_input = $('#id-input-file-3');
                file_input
                    .ace_file_input('update_settings',
                    {
                        'btn_choose': btn_choose,
                        'no_icon': no_icon,
                        'allowExt': whitelist_ext,
                        'allowMime': whitelist_mime
                    })
                file_input.ace_file_input('reset_input');

                file_input
                    .off('file.error.ace')
                    .on('file.error.ace', function (e, info) {
                        //console.log(info.file_count);//number of selected files
                        //console.log(info.invalid_count);//number of invalid files
                        //console.log(info.error_list);//a list of errors in the following format

                        //info.error_count['ext']
                        //info.error_count['mime']
                        //info.error_count['size']

                        //info.error_list['ext']  = [list of file names with invalid extension]
                        //info.error_list['mime'] = [list of file names with invalid mimetype]
                        //info.error_list['size'] = [list of file names with invalid size]


                        /**
                        if( !info.dropped ) {
                            //perhapse reset file field if files have been selected, and there are invalid files among them
                            //when files are dropped, only valid files will be added to our file array
                            e.preventDefault();//it will rest input
                        }
                        */


                        //if files have been selected (not dropped), you can choose to reset input
                        //because browser keeps all selected files anyway and this cannot be changed
                        //we can only reset file field to become empty again
                        //on any case you still should check files with your server side script
                        //because any arbitrary file can be uploaded by user and it's not safe to rely on browser-side measures
                    });


                /**
                file_input
                .off('file.preview.ace')
                .on('file.preview.ace', function(e, info) {
                    console.log(info.file.width);
                    console.log(info.file.height);
                    e.preventDefault();//to prevent preview
                });
                */

            });

            //override dialog's title function to allow for HTML titles
            $.widget("ui.dialog", $.extend({}, $.ui.dialog.prototype, {
                _title: function (title) {
                    var $title = this.options.title || '&nbsp;'
                    if (("title_html" in this.options) && this.options.title_html == true)
                        title.html($title);
                    else title.text($title);
                }
            }));

            $("#id-btn-dialog1").on('click', function (e) {
                e.preventDefault();

                var dialog = $("#dialog-message").removeClass('hide').dialog({
                    modal: true,
                    title: "<div class='widget-header widget-header-small'><h4 class='smaller'><i class='ace-icon fa fa-check'></i> jQuery UI Dialog</h4></div>",
                    title_html: true,
                    buttons: [
                        {
                            text: "Cancel",
                            "class": "btn btn-minier",
                            click: function () {
                                $(this).dialog("close");
                            }
                        },
                        {
                            text: "OK",
                            "class": "btn btn-primary btn-minier",
                            click: function () {
                                $(this).dialog("close");
                            }
                        }
                    ]
                });

                /**
                dialog.data( "uiDialog" )._title = function(title) {
                    title.html( this.options.title );
                };
                **/
            });
        }

        $scope.nuevoReporteFactura = function () {
            $scope.reporteFactura = {
                factura: '',
                fechaFactura: null,
                numeroCheque: '',
                fechaPago: null,
                proveedor: '',
                tasaCero: '',
                excentos: '',
                compras: '',
                gastos: '',
                ivaCompras: '',
                ivaGastos: '',
                retencionISR: '',
                retencionIVA: '',
                total: ''
            };
            $('#modal-table').modal('show');
            $('#numeroCheque').focus();
        }

        $scope.asignarFechaPago = function () {

            $scope.fechaPagoAsigna = null;
            
            $("#fechaPagoAsigna").datepicker({
                showOtherMonths: true,
                selectOtherMonths: false,
                dateFormat: 'dd/mm/yy'
            });

            $('#modalPagos').modal('show');
            $('#numeroCheque').focus();
        }

        $scope.actualizarBancos = function () {

            operationsFactory.actualizarBancos($scope.banco.idBancos, $scope.banco.numero, $scope.banco.fechaPagoBanco, $scope.banco.proveedor, $scope.banco.referencia, $scope.banco.fechaFacturaBanco
                , $scope.banco.depositos, $scope.banco.cargos, $scope.banco.saldo, $sessionStorage.authorizationData.idUsuario, 1)
                .then(function (data) {
                    $log.info(data.data);
                    $scope.actualizado = true;
                })
                .catch(function (error) {

                    $log.error(error);

                    if (error.data.status == 400) {
                        alert('No se pudo registrar el reporte. Intente más tarde');
                        $scope.process = false;
                        $scope.isDisabled = false;
                    }

                    full.resolve();
                });

        }

        $scope.crearReporteFactura = function () {

            operationsFactory.registrarreporte($scope.reporteFactura.factura, $('#fechaFactura').val(), $scope.reporteFactura.numeroCheque, $('#fechaPago').val()
                , $scope.reporteFactura.proveedor, $scope.reporteFactura.tasaCero, $scope.reporteFactura.excentos, $scope.reporteFactura.compras, $scope.reporteFactura.gastos
                , $scope.reporteFactura.ivaCompras, $scope.reporteFactura.ivaGastos, $scope.reporteFactura.retencionISR, $scope.reporteFactura.retencionIVA, $scope.reporteFactura.total
                , $sessionStorage.authorizationData.idUsuario)
                .then(function (data) {
                    $log.info(data.data);
                    $scope.completed = true;
                })
                .catch(function (error) {

                    $log.error(error);

                    if (error.data.status == 400) {
                        alert('No se pudo registrar el reporte. Intente más tarde');
                        $scope.process = false;
                        $scope.isDisabled = false;
                    }

                    full.resolve();
                });
        }

        $scope.procesarDepositos = function (depositos) {

            var dep = 0.00;
            var car = 0.00;
            var sal = 0.00;

            dep = parseFloat(depositos);
            car = parseFloat($scope.banco.cargos);
            sal = dep + (-1 * car);

            $scope.banco.saldo = formatCurrency(sal, false);
        }

        $scope.procesarCargos = function (cargos) {

            var dep = 0.00;
            var car = 0.00;
            var sal = 0.00;

            car = parseFloat(cargos);
            dep = parseFloat($scope.banco.depositos);
            sal = dep + (-1 * car);

            $scope.banco.saldo = formatCurrency(sal, false);
        }

        $scope.procesarFechasBancos = function (e) {

            var total = 0;
            $scope.bancosFechasPagos = [];

            $('#dynamic-table').find('tbody td input[type=checkbox]').each(function () {
                if (this.checked) {
                    total++;
                    var row = $(this).closest('tr').get(0);
                    $scope.itemBanco = $scope.myTable.row(row).data();
                    $scope.bancosFechasPagos.push($scope.itemBanco.idBancos);
                }
            });

            if (total == 0) {
                alert('Debe seleccionar al menos 1 registro de banco para asignar fecha de pago');
            }
            else {
                $log.info($scope.bancosFechasPagos);
                $('#modalPagos').modal('hide');
            }
        }

        $scope.$watch('completed', function () {
            if ($scope.completed) {
                $scope.process = false;
                $scope.isDisabled = false;
                alert('Reporte factura creado de forma exitosa...');
                $('#modal-table').modal('hide');
                $window.location.href = '/home/bancos';
            }
        });

        $scope.$watch('actualizado', function () {
            if ($scope.actualizado) {
                $scope.process = false;
                $scope.isDisabled = false;
                alert('El registro de Bancos se actualizo de forma exitosa...');
                $('#modalBanco').modal('hide');
                $window.location.href = '/home/bancos';
            }
        });

        $scope.$watch('sendDates', function () {
            if ($scope.sendDates) {
                $scope.process = false;
                $scope.isDisabled = false;
                alert('Las fechas de pago de los bancos se enviaron de forma exitosa...');
                $('#modalPagos').modal('hide');
                $window.location.href = '/home/bancos';
            }
        });

        function formatCurrency(num, simbol) {
            num = num.toString().replace(/\$|\,/g, '');
            if (isNaN(num)) {
                num = "0";
            }

            var sign = (num == (num = Math.abs(num)));
            num = Math.floor(num * 100 + 0.50000000001);
            var cents = num % 100;
            num = Math.floor(num / 100).toString();

            if (cents < 10) {
                cents = "0" + cents;
            }
            for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++) {
                num = num.substring(0, num.length - (4 * i + 3)) + ',' + num.substring(num.length - (4 * i + 3));
            }

            if (simbol) {
                return (((sign) ? '' : '-') + '$' + num + '.' + cents);
            }
            else {
                return (((sign) ? '' : '-') + num + '.' + cents);
            }

        }
    }
})();