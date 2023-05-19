$(document).ready(function(){
        $('.dpicker').datepicker({
            setDate: new Date(),
            todayBtn: "linked",
            language: 'es',
            autoclose: true,
            format: 'dd-mm-yyyy'
        });
})