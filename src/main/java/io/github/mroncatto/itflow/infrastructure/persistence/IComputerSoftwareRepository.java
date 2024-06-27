package io.github.mroncatto.itflow.infrastructure.persistence;

import io.github.mroncatto.itflow.domain.device.entity.DeviceComputerSoftware;
import io.github.mroncatto.itflow.domain.device.entity.pk.DeviceComputerSoftwarePK;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface IComputerSoftwareRepository extends JpaRepository<DeviceComputerSoftware, DeviceComputerSoftwarePK>, JpaSpecificationExecutor<DeviceComputerSoftware> {

}
