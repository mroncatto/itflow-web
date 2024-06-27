package io.github.mroncatto.itflow.infrastructure.persistence;


import io.github.mroncatto.itflow.application.model.IAbstractRepository;
import io.github.mroncatto.itflow.domain.device.entity.DeviceComputer;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface IDeviceComputerRepository extends IAbstractRepository<DeviceComputer, Long>, JpaSpecificationExecutor<DeviceComputer> {
}
