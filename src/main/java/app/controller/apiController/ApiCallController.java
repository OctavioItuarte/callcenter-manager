package app.controller.apiController;


import app.domain.Call;
import app.dto.CallDTO;
import app.service.CallService;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/calls")
public class ApiCallController {

    @Autowired
    CallService callService;

    @GetMapping("")
    public ResponseEntity<?> getCalls() {
        List<CallDTO> calls = callService.getAllCalls();
        if (calls.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
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



