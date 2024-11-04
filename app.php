<?php
session_status() === PHP_SESSION_ACTIVE ?: session_start();

// Adiciona cabeçalhos CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Requer PHPMailer
require "vendor/PHPMailer/src/Exception.php";
require "vendor/PHPMailer/src/PHPMailer.php";
require "vendor/PHPMailer/src/SMTP.php";

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    // Inicialize um array para armazenar mensagens de erro
    $errors = [];

    // Validação de Nome
    if (empty($_POST['nome']) || strlen($_POST['nome']) < 3) {
        $errors[] = "O nome é obrigatório e deve ter pelo menos 3 caracteres.";
    }

    // Validação de Email
    if (empty($_POST['email']) || !filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
        $errors[] = "O email é obrigatório e deve ser válido.";
    }

    // Validação de Telefone
    if (empty($_POST['phone']) || !preg_match('/^\(\d{2}\)\d{5}-\d{4}$/', $_POST['phone'])) {
        $errors[] = "O número de telefone é obrigatório e deve estar no formato (XX)XXXXX-XXXX.";
    }

    // Validação de Altura, Peso e Peso Ideal
    if (empty($_POST['altura']) || $_POST['altura'] <= 0) {
        $errors[] = "A altura é obrigatória e deve ser um valor positivo.";
    }
    if (empty($_POST['peso']) || $_POST['peso'] <= 0) {
        $errors[] = "O peso é obrigatório e deve ser um valor positivo.";
    }
    if (empty($_POST['pesoIdeal']) || $_POST['pesoIdeal'] <= 0) {
        $errors[] = "O peso ideal é obrigatório e deve ser um valor positivo.";
    }

    // Verifique se há erros e responda com JSON, evitando execução adicional
    if (!empty($errors)) {
        echo json_encode(['errors' => $errors]);
        exit;
    }

    // Se não houver erros, prossegue com o envio do e-mail
    $nome = $_POST['nome'];
    $email = $_POST['email'];
    $telefone = $_POST['phone'];
    $altura = $_POST['altura'];
    $peso = $_POST['peso'];
    $pesoIdeal = $_POST['pesoIdeal'];


    // Montagem da mensagem
    $mensagemEmail = "Mensagem enviada por: {$nome}<br>";
    $mensagemEmail .= "Assunto: Escrito no curso <br>";
    $mensagemEmail .= "Email: {$email}<br>";
    $mensagemEmail .= "Telefone: {$telefone}<br>";
    $mensagemEmail .= "Altura: {$altura}<br>";
    $mensagemEmail .= "Peso: {$peso}<br>";
    $mensagemEmail .= "Peso Ideal: {$pesoIdeal}<br>";

    // Configuração do e-mail
    $mail = new PHPMailer();
    $mail->CharSet = 'UTF-8';
    $mail->isSMTP();
    $mail->Host = '#';
    $mail->SMTPAuth = true;
    $mail->Username = '#';
    $mail->Password = '#';
    $mail->SMTPSecure = 'tls';
    $mail->Port = 587;
    $mail->isHTML(true);
    $mail->setFrom('#', '#');
    $mail->FromName = '#';
    $mail->addAddress('#', 'SAC');
    
    $mail->Subject = 'Mensagem de ' . $nome;
    $mail->Body = $mensagemEmail;

    try {
        if ($mail->send()) {
            echo json_encode(["success" => "Mensagem enviada com sucesso!"]);
        } else {
            echo json_encode(["error" => "Houve um erro ao enviar a mensagem: " . $mail->ErrorInfo]);
        }
    } catch (Exception $e) {
        echo json_encode(["error" => "Erro no envio do e-mail: {$mail->ErrorInfo}"]);
    }

} else {
    // Retorna erro 405 para método HTTP não permitido
    http_response_code(405);
    header('Content-Type: application/json');
    echo json_encode(["error" => "Método não permitido"]);
}

