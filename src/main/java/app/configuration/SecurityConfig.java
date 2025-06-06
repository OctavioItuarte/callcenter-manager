package app.configuration;

import app.auth.JwtAuthenticationFilter;
import app.auth.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig  {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final JwtTokenProvider authProvider;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception
    {
        return http
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(authRequest ->
                        authRequest
                                .requestMatchers("/login").permitAll()
                                .requestMatchers("/").permitAll()
                                .requestMatchers("/static/**").permitAll()
                                .requestMatchers("/uploadArchive").permitAll()
                                .requestMatchers("/registerUser").permitAll()
                                .requestMatchers("/archives").permitAll()
                                .requestMatchers("/users").permitAll()
                                .requestMatchers(HttpMethod.POST,"/filesProcessor/**").permitAll()
                                .requestMatchers("/user").hasAuthority("admin")
                                .requestMatchers(HttpMethod.POST, "/files/**").hasAuthority("admin")
                                .requestMatchers(HttpMethod.PATCH, "/files/**").hasAuthority("admin")
                                .requestMatchers("/register").hasAuthority("admin")
                                .anyRequest().authenticated()
                )
                .sessionManagement(sessionManager->
                        sessionManager
                                .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authenticationProvider(authProvider)
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
                .build();

    }

    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }

}
