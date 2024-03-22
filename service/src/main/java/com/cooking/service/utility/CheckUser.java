package com.cooking.service.utility;

import com.cooking.service.response.JwtOutDTO;
import com.cooking.service.response.JwtResponse;
import com.cooking.service.security.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Map;

@Component
public class CheckUser {

    @Autowired
     private JwtTokenProvider JwtTokenProvider;

    public JwtResponse checkUserByJWT(Map<String, String> headers){
        String authorizationHeader = headers.get("authorization");
        JwtResponse response = new JwtResponse();
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer")) {
            String token = authorizationHeader.substring(7); // "Bearer " has 7 characters

            if(JwtTokenProvider.validateToken(token)){
                String id = JwtTokenProvider.getIdFromToken(token);
                response.setData(new JwtOutDTO(id));
            }else{
                response.setError(new ErrorMessage("Token not valid", "Unauthorized", ErrorStatus.UNAUTHORIZED ));
            }
        } else {
            response.setError(new ErrorMessage("Unauthorized", "Unauthorized", ErrorStatus.UNAUTHORIZED ));
        }

        return response;
    }
}
