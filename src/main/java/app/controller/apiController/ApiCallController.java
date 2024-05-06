package app.controller.apiController;



import app.auth.JwtTokenProvider;
import app.dto.CallDTO;
import app.dto.UserDTO;
import app.service.CallService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.Set;

@RestController
@RequestMapping("/calls")
public class ApiCallController {

    @Autowired
    CallService callService;
    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    private String extractTokenFromHeader(HttpServletRequest request) {
        String header = request.getHeader("Authorization");
        if (header != null && header.startsWith("Bearer ")) {
            return header.substring(7);
        }
        return null;
    }

    @GetMapping("")
    public ResponseEntity<?> getCalls(HttpServletRequest request) {

        String token = extractTokenFromHeader(request);
        UserDTO userDate = this.jwtTokenProvider.getUserDate(token);
        String role = userDate.getRole();
        String trunk = userDate.getTrunk().toUpperCase(Locale.ROOT);
        Set<String> format = userDate.getFormatCall();

        List<CallDTO> calls = new ArrayList<>();

        if (role.equals("admin") || trunk.equals("ALL")) {
            calls.addAll(callService.getAllCalls());
        }
        else{
                calls.addAll( callService.getCallsBySourceTrunkOrDestinationTrunk(trunk, format));
            }
        if (calls.isEmpty()) {
            return ResponseEntity.notFound().build();
        }else
            return ResponseEntity.ok(calls);


    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getCallsByFileId(@PathVariable Long id) {
        List<CallDTO> calls = callService.getCallsByFileId(id);
        if (calls.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(calls);
    }
}



