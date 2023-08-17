package com.vitrum.api.controller;

import com.vitrum.api.dto.Request.ProjectRequest;
import com.vitrum.api.entity.Project;
import com.vitrum.api.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/project")
@RequiredArgsConstructor
@CrossOrigin("http://localhost:5173")
public class ProjectController {

//    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
//    public Project addProject(
//            @AuthenticationPrincipal UserDetails userDetails,
//            @ModelAttribute ProjectRequest projectRequest
//    ) {
//        Long userId = ((User) userDetails).getId();
//        return projectService.saveProject(projectRequest, userId);
//    }
}
