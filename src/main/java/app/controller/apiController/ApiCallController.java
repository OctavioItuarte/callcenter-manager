package app.controller.apiController;


import app.domain.Call;
import app.service.CallService;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/calls")
public class ApiCallController {

    @Autowired
    CallService callService;

    @GetMapping("/{id}")
    public ResponseEntity<?> getCallsByFileId(@PathVariable Long id) {
        List<Call> calls = callService.getCallsByFileId(id);
        if (calls.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(calls);
    }
}



