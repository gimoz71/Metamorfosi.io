<?php 
    if(isset($_POST['messaggio'])){
        $to = "gm3871@gmail.com";                       // indirizzo email del destinatario
        $from = $_POST['email'];                        // indirizzo email del richiedente

        $nome = $_POST['nome'];
        $cognome = $_POST['cognome'];

        /* email per destinatario */
        $headers = "From:" . $from;
        $subject = "Richiesta info da Metamorfosi.io";
        $message = $nome . " " . $cognome . " (" . $from .  ") ha inviato la seguente richiesta:" . "\n\n" . $_POST['messaggio'];
        
        /* email per richiedente */
        // $headers2 = "From:" . $to;
        $headers2 = "From:noreply@metamorfosi.io";
        $subject2 = "Ciao " . $nome . ". Benvenuto in Metamorfosi.io!";
        $message2 = "Abbiamo preso in carico la tua richiesta di informazioni su Metamorfosi.io. \n\n Quì di seguito trovi il riepilogo della tua richiesta a Metamorfosi.io " .  "\n\n" . $_POST['messaggio'];

        // mail($to,$subject,$message,$headers);           // invia una copia del messaggio al destinatario
        mail($from,$subject2,$message2,$headers2);      // invia una copia del messaggio al richiedente
        'X-Mailer: PHP/' . phpversion();

        if(mail($to, $subject, $message, $headers)) echo json_encode(['success'=>true]); 
            else echo json_encode(['success'=>false]);
        exit;
    };
?>