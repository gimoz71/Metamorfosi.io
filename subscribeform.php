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

    if (isset($_POST['g-recaptcha-response'])) {
        $captcha = $_POST['g-recaptcha-response'];
        print "errore no captcha";
    } else {
        $captcha = false;
    }
    
    if (!$captcha) {
        //Do something with error
        echo "errore no captcha";
    
    } else {
        $secret   = '6LcUJAoeAAAAACXOMJBbTOMoDgJ1k0epU6ZtGD5F';
        $response = file_get_contents(
            "https://www.google.com/recaptcha/api/siteverify?secret=" . $secret . "&response=" . $captcha . "&remoteip=" . $_SERVER['REMOTE_ADDR']
        );
        // use json_decode to extract json response
        $response = json_decode($response);
    
        if ($response->success === false) {
            //Do something with error
        echo "errore json";
        }
    }
    
    //... The Captcha is valid you can continue with the rest of your code
    //... Add code to filter access using $response . score
    if ($response->success==true && $response->score <= 0.5) {
        //Do something to denied access
        echo "denied";
    }
?>

