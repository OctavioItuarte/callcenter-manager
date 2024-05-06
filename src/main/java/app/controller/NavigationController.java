package app.controller;

import app.auth.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class NavigationController {

    @Autowired
    private JwtTokenProvider jwtp;


    private void setCredentals(Model model, String token){
        String rol = null;
        if (StringUtils.hasText(token)) {
            if (jwtp.validateToken(token)) {
                rol = jwtp.getUserDate(token).getRole();
                String name = jwtp.getUserDate(token).getName();
                model.addAttribute("token", token);
                model.addAttribute("user", name);
            } else {
                model.addAttribute("token", null);
            }
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


    @GetMapping("/registerUser")
    public String formUser (Model model, @CookieValue(name = "token") String token ){
        this.setCredentals(model, token);

        return "/FormUser";
    }

    @GetMapping("/archives")
    public String tableArchives(Model model,  @CookieValue(name = "token") String token){
        this.setCredentals(model, token);

        return "/TableArchives";
    }

    @GetMapping("/users")
    public String userList(Model model,  @CookieValue(name = "token") String token){
        this.setCredentals(model, token);

        return "/UserList";
    }

}
