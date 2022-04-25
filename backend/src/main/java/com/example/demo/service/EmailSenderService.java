package com.example.demo.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

@Service
public class EmailSenderService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendEmail(String toEmail,
                          String subject,
                          String body) throws MessagingException {
        MimeMessage message=mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);
       // SimpleMailMessage message = new SimpleMailMessage();



        helper.setFrom("kishoredurai27@gmail.com");
        helper.setTo(toEmail);
        helper.setText(body,true);
        helper.setSubject(subject);

        mailSender.send(message);

        System.out.println("Mail send succ");
    }

}
