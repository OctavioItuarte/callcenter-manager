package app.controller;

import app.auth.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;

@Controller
public class NavigationController {

    @Autowired
    private JwtTokenProvider jwtp;


    private void setCredentals(Model model, String token){
        String rol = null;
        if (token != null) {
            rol = jwtp.getRoleFromToken(token);
            String name = jwtp.getNameUserFromToken(token);
            model.addAttribute("token", token);
            model.addAttribute("user", name);
        }
        model.addAttribute("rol", rol);

    }


    @GetMapping("/")
    public String home(Model model, @CookieValue(name = "token", required = false) String token) {
        this.setCredentals(model, token);

        return "/Home";
    }

    @GetMapping("/uploadArchive")
    public String formArchived(Model model, @CookieValue(name = "token") String token) {

        this.setCredentals(model, token);
        return "/Form";
    }


}
