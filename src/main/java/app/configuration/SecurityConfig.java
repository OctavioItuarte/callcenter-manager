package app.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .authorizeRequests()
                .antMatchers("/public/**").permitAll() // Permitir acceso público a ciertas rutas
                .antMatchers("/admin/**").hasRole("ADMIN") // Requiere rol ADMIN para rutas de administrador
                .anyRequest().authenticated() // Requiere autenticación para cualquier otra ruta
                .and()
                .formLogin() // Configurar el formulario de inicio de sesión
                .loginPage("/login") // Página de inicio de sesión personalizada
                .permitAll() // Permitir acceso público al formulario de inicio de sesión
                .and()
                .logout() // Configurar la funcionalidad de cierre de sesión
                .logoutUrl("/logout") // URL para cerrar sesión
                .permitAll(); // Permitir acceso público a la URL de cierre de sesión
    }


    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
