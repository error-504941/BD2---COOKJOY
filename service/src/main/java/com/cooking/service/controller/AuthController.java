package com.cooking.service.controller;

import com.cooking.service.model.User;
import com.cooking.service.repository.UserRepository;
import com.cooking.service.request.LoginRequest;
import com.cooking.service.request.SignupRequest;
import com.cooking.service.response.JwtOutDTO;
import com.cooking.service.response.JwtResponse;
import com.cooking.service.response.SignUpResponse;
import com.cooking.service.security.JwtTokenProvider;
import com.cooking.service.service.UserDetailsImpl;
import com.cooking.service.utility.ErrorMessage;
import com.cooking.service.utility.ErrorStatus;
import jakarta.validation.Valid;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;


    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtTokenProvider JwtTokenProvider;

    @PostMapping("/signin")
    public JwtResponse authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        JwtResponse response = new JwtResponse();
       try {

           Authentication authentication = authenticationManager.authenticate(
                   new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

           SecurityContextHolder.getContext().setAuthentication(authentication);
           String jwt = JwtTokenProvider.generateJwtToken(authentication);

           UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

           JwtOutDTO jwtDTO = new JwtOutDTO(jwt,
                   userDetails.getId().toString(),
                   userDetails.getUsername(),
                   userDetails.getEmail());

           response.setData(jwtDTO);

       }
       catch (BadCredentialsException e) {
           response.setError(new ErrorMessage("BadCredentialsException", "Credenziali errate.Riporva", ErrorStatus.UNAUTHORIZED));
       }
       catch (AuthenticationException e) {
           response.setError(new ErrorMessage("AuthenticationException", "Credenziali errate.Riporva", ErrorStatus.UNAUTHORIZED));
       }
       catch (Exception ex){
           response.setError(new ErrorMessage("BadCredentialsException", "Si è verificato un errore. Riprova più tardi.", ErrorStatus.INTERNAL_SERVER_ERROR));
       }

       return response;
    }

    @PostMapping("/signup")
    public SignUpResponse registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
        SignUpResponse response = new SignUpResponse();
        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            response.setError(new ErrorMessage(
                    "Error: Username is already taken!",
                    "Errore: L'username inserito è già in uso. Si prega di sceglierne un altro.",
                    ErrorStatus.UNAUTHORIZED
            ));
        }

        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            response.setError(new ErrorMessage(
                    "Error: Email is already in use!",
                    "Errore: Email già in uso.",
                    ErrorStatus.UNAUTHORIZED
            ));
        }

        if(response.getError() == null){

            // Create new user's account
            User user = new User(signUpRequest.getUsername(),
                    signUpRequest.getEmail(),
                    encoder.encode(signUpRequest.getPassword()));


            userRepository.save(user);
            response.setData("Registrazione completata con successo. Benvenuto nel nostro sistema!");
        }

        return response;

    }
}