package io.github.mroncatto.itflow.domain.device.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import io.github.mroncatto.itflow.domain.device.entity.Device;
import io.github.mroncatto.itflow.domain.staff.entity.Staff;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.io.Serial;
import java.io.Serializable;

@Getter
@Setter
@Builder
@ToString
@JsonInclude(JsonInclude.Include.NON_NULL)
public class DeviceStaffResponseDto implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    private Long id;

    private Staff staff;

    private String login;
}
