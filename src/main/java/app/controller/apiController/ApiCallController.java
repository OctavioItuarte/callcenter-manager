package app.controller.apiController;



import app.auth.JwtTokenProvider;
import app.dto.CallDTO;
import app.service.CallService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

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
        String role = this.jwtTokenProvider.getRoleFromToken(token);

        List<CallDTO> calls = new ArrayList<>();

        if (role.equals("admin")) {
            calls.addAll(callService.getAllCalls());
        }
        else{
                String trunk = this.jwtTokenProvider.getTrunkFromToken(token);
                System.out.println(trunk);
                calls.addAll( callService.getCallsBySourceTrunk(trunk));
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



