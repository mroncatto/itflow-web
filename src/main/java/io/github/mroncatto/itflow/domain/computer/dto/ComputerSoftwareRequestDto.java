package io.github.mroncatto.itflow.domain.computer.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import io.github.mroncatto.itflow.domain.device.entity.DeviceComputer;
import io.github.mroncatto.itflow.domain.device.entity.DeviceComputerSoftware;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.springframework.beans.BeanUtils;

@Getter
@Setter
@NoArgsConstructor
@ToString
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ComputerSoftwareRequestDto {

    public interface ComputerSoftwareView {
        interface ComputerSoftwarePost {
        }
    }


    @NotNull(groups = {ComputerSoftwareView.ComputerSoftwarePost.class},
            message = "[{field.software}] {validation.required}")
    private DeviceComputerSoftware deviceComputerSoftware;

//    @NotNull(groups = {ComputerSoftwareView.ComputerSoftwarePost.class},
//            message = "[{field.computer}] {validation.required}")
//    private DeviceComputer deviceComputer;


    public DeviceComputerSoftware convert() {
        var computerSoftware = new DeviceComputerSoftware();
        BeanUtils.copyProperties(this, computerSoftware);
        return computerSoftware;
    }


}
