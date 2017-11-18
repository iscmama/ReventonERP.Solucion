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
            $scope.editarDeposito = false;
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

            $scope.reporteDeposito = {
                fechaPago: null,
                proveedor: '',
                referenciaDepositos: '',
                depositos: ''
            };

            $scope.busqueda = {
                numeroCheque: '',
                proveedor: '',
                numeroFactura: '',
                referenciaDepositos: '',
                opcionFechaPago: 1,
                opcionFechaFactura: 1
            };

            operationsFactory.obtenerBancos()
                .then(function (data) {
                    $scope.bancos = data;

                    $log.info($scope.bancos.data.Bancos);

                    if ($scope.bancos.data.Bancos.length > 0) {

                        $scope.myTable =
                            $('#dynamic-table')
                            .DataTable({
                                bAutoWidth: false,
                                destroy: true,
                                    data: $scope.bancos.data.Bancos,
                                    columns: [

                                        { defaultContent: '<label class="pos-rel"><input type="checkbox" class="ace" /><span class="lbl"></span></label>', bSortable: 'false' },

                                        { data: "numeroCheque" },
                                        { data: "fechaPago" },
                                        { data: "proveedor" },
                                        { data: "numeroFactura" },
                                        { data: "fechaFactura" },
                                        { data: "referenciaDepositos" },
                                        { data: "depositos" },
                                        { data: "cargos" },
                                        { data: "saldo" },

                                        {
                                            defaultContent: '<div class="hidden-sm hidden-xs action-buttons"><a class="blue" href="#" id="btnVerBanco"><i class="ace-icon fa fa-search-plus bigger-130"></i> </a><a class="green" href="#" id="btnEditarBanco"><i class="ace-icon fa fa-pencil bigger-130"></i> </a> <a class="red" href="#" id="id-btn-dialog2"><i class="ace-icon fa fa-trash-o bigger-130"></i> </a> </div>' +
                                            '<div class="hidden-md hidden-lg"><div class="inline pos-rel"><button class="btn btn-minier btn-yellow dropdown-toggle" data-toggle="dropdown" data-position="auto"><i class="ace-icon fa fa-caret-down icon-only bigger-120"></i> </button><ul class="dropdown-menu dropdown-only-icon dropdown-yellow dropdown-menu-right dropdown-caret dropdown-close"><li> <a href="#" class="tooltip-info" data-rel="tooltip" title="View" id="btnVerBanco"> <span class="blue"> <i class="ace-icon fa fa-search-plus bigger-120"></i></span>   </a> </li> <li> <a href="#" class="tooltip-success" data-rel="tooltip" title="Edit"> <span class="green"><i class="ace-icon fa fa-pencil-square-o bigger-120"></i></span></a></li><li><a href="#" id="id-btn-dialog2"> <span class="red"><i class="ace-icon fa fa-trash-o bigger-120"></i></span></a> </li> </ul></div></div>', bSortable: 'false'
                                        }

                                    ],

                                    columnDefs: [
                                        {
                                            targets: [2, 5], render: function (data, type, row) {

                                                if (data != null) {
                                                    moment.locale('es');
                                                    var dateMoment = moment(data);
                                                    return dateMoment.format("DD-MMM-YYYY").toUpperCase().replace('.', '');
                                                }
                                                else {
                                                    return '';
                                                }                                                
                                            }
                                        },
                                        {
                                            targets: [7, 8, 9], render: function (data, type, row) {
                                                return formatCurrency(data, true);
                                            }
                                        }
                                    ],

                                    select: {
                                        style: 'multi'
                                    },

                                    "language": {
                                        "url": "assets/js/Spanish.json"
                                    },

                                    "lengthMenu": [[200, 500, 1000, -1], [200, 500, 1000, "All"]],

                                    "bSort": false
                                });

                        $.fn.dataTable.Buttons.defaults.dom.container.className = 'dt-buttons btn-overlap btn-group btn-overlap';

                        new $.fn.dataTable.Buttons($scope.myTable, {
                            buttons: [
                                {
                                    "extend": "csv",
                                    "text": "<i class='fa fa-file-excel-o bigger-110 green'></i> <span class='hidden'>Export to CSV</span>",
                                    "className": "btn btn-white btn-primary btn-bold"
                                }                              
                                
                            ]
                        });
                        $scope.myTable.buttons().container().appendTo($('.tableTools-container'));                        

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

                    }
                    else {
                        $scope.myTable = $('#dynamic-table').DataTable({
                            destroy: true, "language": {
                                "url": "assets/js/Spanish.json"
                            } });
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

            $("#fechaPagoDepo").datepicker({
                showOtherMonths: true,
                selectOtherMonths: false,
                dateFormat: 'dd/mm/yy'
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

                var row = $(this).parents('tr')[0];
                $scope.dataBanco = $scope.myTable.row(row).data();

                if ($scope.dataBanco.tipo == 1) {
                    $scope.banco = {
                        idBancos: $scope.dataBanco.idBancos,
                        numero: $scope.dataBanco.numeroCheque,
                        fechaPagoBanco: moment($scope.dataBanco.fechaPago).format("DD/MM/YYYY"),
                        proveedor: $scope.dataBanco.proveedor,
                        referencia: $scope.dataBanco.numeroFactura,
                        fechaFacturaBanco: moment($scope.dataBanco.fechaFactura).format("DD/MM/YYYY"),
                        depositos: formatCurrency($scope.dataBanco.depositos, false),
                        cargos: formatCurrency($scope.dataBanco.cargos, false),
                        saldo: formatCurrency($scope.dataBanco.saldo, false),
                        fechaAlta: $scope.dataBanco.fechaAlta,
                        idUsuarioAlta: $scope.dataBanco.idUsuarioAlta,
                        fechaModificacion: $scope.dataBanco.fechaModificacion,
                        idUsuarioModificacion: $scope.dataBanco.idUsuarioModificacion
                    };

                    $('#modalBanco').modal('show');
                    $scope.editarBanco = false;
                    $('#numero').focus();
                    $scope.$apply();
                }
                else {
                    $scope.reporteDeposito = {
                        idBancos: $scope.dataBanco.idBancos,
                        fechaPago: moment($scope.dataBanco.fechaPago).format("DD/MM/YYYY"),
                        proveedor: $scope.dataBanco.proveedor,
                        referenciaDepositos: $scope.dataBanco.referenciaDepositos,
                        depositos: formatCurrency($scope.dataBanco.depositos, false),
                    };

                    $('#modalDepositos').modal('show');
                    $scope.editarDeposito = false;
                    $('#referenciaDepo').focus();
                    $scope.$apply();
                }


            });

            $('#dynamic-table').on('click', '#btnEditarBanco', function (e) {

                var row = $(this).parents('tr')[0];
                $scope.dataBanco = $scope.myTable.row(row).data();

                e.stopImmediatePropagation();
                e.stopPropagation();
                e.preventDefault();

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

                if ($scope.dataBanco.tipo == 1) {
                    $scope.banco = {
                        idBancos: $scope.dataBanco.idBancos,
                        numero: $scope.dataBanco.numeroCheque,
                        fechaPagoBanco: moment($scope.dataBanco.fechaPago).format("DD/MM/YYYY"),
                        proveedor: $scope.dataBanco.proveedor,
                        referencia: $scope.dataBanco.numeroFactura,
                        fechaFacturaBanco: moment($scope.dataBanco.fechaFactura).format("DD/MM/YYYY"),
                        depositos: formatCurrency($scope.dataBanco.depositos, false),
                        cargos: formatCurrency($scope.dataBanco.cargos, false),
                        saldo: formatCurrency($scope.dataBanco.saldo, false),
                        fechaAlta: $scope.dataBanco.fechaAlta,
                        idUsuarioAlta: $scope.dataBanco.idUsuarioAlta,
                        fechaModificacion: $scope.dataBanco.fechaModificacion,
                        idUsuarioModificacion: $scope.dataBanco.idUsuarioModificacion
                    };

                    $('#modalBanco').modal('show');
                    $scope.editarBanco = true;
                    $('#numero').focus();
                    $scope.$apply();
                }
                else {
                    $scope.reporteDeposito = {
                        idBancos: $scope.dataBanco.idBancos,
                        fechaPago: moment($scope.dataBanco.fechaPago).format("DD/MM/YYYY"),
                        proveedor: $scope.dataBanco.proveedor,
                        referenciaDepositos: $scope.dataBanco.referenciaDepositos,
                        depositos: formatCurrency($scope.dataBanco.depositos, false),
                    };

                    $('#modalDepositos').modal('show');
                    $scope.editarDeposito = true;
                    $('#referenciaDepo').focus();
                    $scope.$apply();
                }

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
            $('#numero').focus();
        }

        $scope.nuevoDeposito = function () {
            $scope.reporteDeposito = {
                idBancos: 0,
                fechaPago: null,
                proveedor: '',
                referenciaDepositos: '',
                depositos: ''
            };

            $scope.editarDeposito = true;
            $('#modalDepositos').modal('show');
            $('#referenciaDepo').focus();
        }

        $scope.asignarFechaPago = function () {

            $scope.fechaPagoAsigna = null;
            
            $("#fechaPagoAsigna").datepicker({
                showOtherMonths: true,
                selectOtherMonths: false,
                dateFormat: 'dd/mm/yy'
            });

            $('#modalPagos').modal('show');
            $('#numero').focus();
        }

        $scope.iniciarBusqueda = function () {

            $scope.busqueda = {
                numeroCheque: '',
                proveedor: '',
                numeroFactura: '',
                referenciaDepositos: '',
                opcionFechaPago: 1,
                opcionFechaFactura: 1
            };

            $('#busFechaPago').find('option[value="1"]').prop('selected', true);

            $('#busFechaFactura').find('option[value="1"]').prop('selected', true);

            $('#modalBusqueda').modal('show');
        }

        $scope.actualizarBancos = function () {

            operationsFactory.actualizarBancos($scope.banco.idBancos, $scope.banco.numero, $scope.banco.fechaPagoBanco, $scope.banco.proveedor, $scope.banco.referencia, $scope.banco.fechaFacturaBanco
                ,$scope.banco.cargos, $sessionStorage.authorizationData.idUsuario)
                .then(function (data) {
                    $log.info(data.data);
                    $scope.actualizado = true;
                })
                .catch(function (error) {

                    $log.error(error);

                    if (error.data.status == 400) {
                        alert('No se pudo actualizar la información de bancos. Intente más tarde');
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

        $scope.registrarDepositos = function () {

            operationsFactory.registrardeposito($scope.reporteDeposito.idBancos, $scope.reporteDeposito.referenciaDepositos, $('#fechaPagoDepo').val(), $scope.reporteDeposito.proveedor, $scope.reporteDeposito.depositos, $sessionStorage.authorizationData.idUsuario)
                .then(function (data) {
                    $log.info(data.data);
                    $scope.completedDeposito = true;
                })
                .catch(function (error) {

                    $log.error(error);

                    if (error.data.status == 400) {
                        alert('No se pudo registrar el deposito. Intente más tarde');
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

        $scope.procesarBusqueda = function () {
                      
            operationsFactory.busqueda($scope.busqueda.numeroCheque, $scope.busqueda.proveedor, $scope.busqueda.numeroFactura, $scope.busqueda.referenciaDepositos, $scope.busqueda.opcionFechaPago, $scope.busqueda.opcionFechaFactura)
                .then(function (data) {

                    $scope.bancos = data;

                    $log.info($scope.bancos.data.Bancos);

                    if ($scope.bancos.data.Bancos.length > 0) {

                        $scope.myTable =
                            $('#dynamic-table')
                                .DataTable({
                                    bAutoWidth: false,
                                    destroy: true,
                                    data: $scope.bancos.data.Bancos,
                                    columns: [

                                        { defaultContent: '<label class="pos-rel"><input type="checkbox" class="ace" /><span class="lbl"></span></label>', bSortable: 'false' },

                                        { data: "numeroCheque" },
                                        { data: "fechaPago" },
                                        { data: "proveedor" },
                                        { data: "numeroFactura" },
                                        { data: "fechaFactura" },
                                        { data: "referenciaDepositos" },
                                        { data: "depositos" },
                                        { data: "cargos" },
                                        { data: "saldo" },

                                        {
                                            defaultContent: '<div class="hidden-sm hidden-xs action-buttons"><a class="blue" href="#" id="btnVerBanco"><i class="ace-icon fa fa-search-plus bigger-130"></i> </a><a class="green" href="#" id="btnEditarBanco"><i class="ace-icon fa fa-pencil bigger-130"></i> </a> <a class="red" href="#" id="id-btn-dialog2"><i class="ace-icon fa fa-trash-o bigger-130"></i> </a> </div>' +
                                            '<div class="hidden-md hidden-lg"><div class="inline pos-rel"><button class="btn btn-minier btn-yellow dropdown-toggle" data-toggle="dropdown" data-position="auto"><i class="ace-icon fa fa-caret-down icon-only bigger-120"></i> </button><ul class="dropdown-menu dropdown-only-icon dropdown-yellow dropdown-menu-right dropdown-caret dropdown-close"><li> <a href="#" class="tooltip-info" data-rel="tooltip" title="View" id="btnVerBanco"> <span class="blue"> <i class="ace-icon fa fa-search-plus bigger-120"></i></span>   </a> </li> <li> <a href="#" class="tooltip-success" data-rel="tooltip" title="Edit"> <span class="green"><i class="ace-icon fa fa-pencil-square-o bigger-120"></i></span></a></li><li><a href="#" id="id-btn-dialog2"> <span class="red"><i class="ace-icon fa fa-trash-o bigger-120"></i></span></a> </li> </ul></div></div>', bSortable: 'false'
                                        }

                                    ],

                                    columnDefs: [
                                        {
                                            targets: [2, 5], render: function (data, type, row) {

                                                if (data != null) {
                                                    moment.locale('es');
                                                    var dateMoment = moment(data);
                                                    return dateMoment.format("DD-MMM-YYYY").toUpperCase().replace('.', '');
                                                }
                                                else {
                                                    return '';
                                                }
                                            }
                                        },
                                        {
                                            targets: [7, 8, 9], render: function (data, type, row) {
                                                return formatCurrency(data, true);
                                            }
                                        }
                                    ],

                                    select: {
                                        style: 'multi'
                                    },

                                    "language": {
                                        "url": "assets/js/Spanish.json"
                                    },

                                    "lengthMenu": [[200, 500, 1000, -1], [200, 500, 1000, "All"]],

                                    "bSort": false
                                });

                        $.fn.dataTable.Buttons.defaults.dom.container.className = 'dt-buttons btn-overlap btn-group btn-overlap';

                        new $.fn.dataTable.Buttons($scope.myTable, {
                            buttons: [
                                {
                                    "extend": "csv",
                                    "text": "<i class='fa fa-file-excel-o bigger-110 green'></i> <span class='hidden'>Export to CSV</span>",
                                    "className": "btn btn-white btn-primary btn-bold"
                                }

                            ]
                        });
                        $scope.myTable.buttons().container().appendTo($('.tableTools-container'));

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

                        $('#modalBusqueda').modal('hide');

                    }
                    else {
                        $scope.myTable = $('#dynamic-table').DataTable({
                            destroy: true, "language": {
                                "url": "assets/js/Spanish.json"
                            }
                        });

                        $('#modalBusqueda').modal('hide');
                    }

                    

                })
                .catch(function (error) {

                    $('#modalBusqueda').modal('hide');

                    $log.error(error);

                    if (error.data.status == 400) {
                        alert('No se pudo procesar la busqueda. Intente más tarde');
                        $scope.process = false;
                        $scope.isDisabled = false;
                    }

                    full.resolve();
                });

            
        }

        $scope.$watch('completed', function () {
            if ($scope.completed) {
                $scope.process = false;
                $scope.isDisabled = false;
                alert('Pago registrado de forma exitosa...');
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

        $scope.$watch('completedDeposito', function () {
            if ($scope.completedDeposito) {
                $scope.process = false;
                $scope.isDisabled = false;
                alert('Registro del Deposito creado de forma exitosa...');
                $('#modalDepositos').modal('hide');
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