resource "aws_vpc" "arianrod" {
  cidr_block = "10.0.0.0/16"

  tags = {
    Name = "arianrod"
  }
}

resource "aws_subnet" "public_1a" {
  # 先程作成したVPCを参照し、そのVPC内にSubnetを立てる
  vpc_id = aws_vpc.arianrod.id

  # Subnetを作成するAZ
  availability_zone = "ap-northeast-1a"

  cidr_block = "10.0.1.0/24"

  tags = {
    Name = "arianrod-public-1a"
  }
}

resource "aws_subnet" "public_1c" {
  # 先程作成したVPCを参照し、そのVPC内にSubnetを立てる
  vpc_id = aws_vpc.arianrod.id

  # Subnetを作成するAZ
  availability_zone = "ap-northeast-1c"

  cidr_block = "10.0.2.0/24"

  tags = {
    Name = "arianrod-public-1c"
  }
}


resource "aws_subnet" "private_1a" {
  vpc_id = aws_vpc.arianrod.id

  availability_zone = "ap-northeast-1a"
  cidr_block        = "10.0.10.0/24"

  tags = {
    Name = "arianrod-private-1a"
  }
}

resource "aws_subnet" "private_1c" {
  vpc_id = aws_vpc.arianrod.id

  availability_zone = "ap-northeast-1c"
  cidr_block        = "10.0.11.0/24"

  tags = {
    Name = "arianrod-private-1c"
  }
}

resource "aws_internet_gateway" "arianrod" {
  vpc_id = aws_vpc.arianrod.id

  tags = {
    Name = "arianrod"
  }
}

resource "aws_eip" "nat_1a" {
  vpc = true

  tags = {
    Name = "arianrod-natgw-1a"
  }
}

resource "aws_nat_gateway" "nat_1a" {
  subnet_id     = aws_subnet.public_1a.id # NAT Gatewayを配置するSubnetを指定
  allocation_id = aws_eip.nat_1a.id       # 紐付けるElasti IP

  tags = {
    Name = "arianrod-1a"
  }
}

resource "aws_eip" "nat_1c" {
  vpc = true

  tags = {
    Name = "arianrod-natgw-1c"
  }
}

resource "aws_nat_gateway" "nat_1c" {
  subnet_id     = aws_subnet.public_1c.id # NAT Gatewayを配置するSubnetを指定
  allocation_id = aws_eip.nat_1c.id       # 紐付けるElasti IP

  tags = {
    Name = "arianrod-1c"
  }
}


resource "aws_route_table" "public" {
  vpc_id = aws_vpc.arianrod.id

  tags = {
    Name = "arianrod-public"
  }
}

resource "aws_route" "public" {
  destination_cidr_block = "0.0.0.0/0"
  route_table_id         = aws_route_table.public.id
  gateway_id             = aws_internet_gateway.arianrod.id
}

resource "aws_route_table_association" "public_1a" {
  subnet_id      = aws_subnet.public_1a.id
  route_table_id = aws_route_table.public.id
}

resource "aws_route_table_association" "public_1c" {
  subnet_id      = aws_subnet.public_1c.id
  route_table_id = aws_route_table.public.id
}

resource "aws_route_table" "private_1a" {
  vpc_id = aws_vpc.arianrod.id

  tags = {
    Name = "arianrod-private-1a"
  }
}

resource "aws_route_table" "private_1c" {
  vpc_id = aws_vpc.arianrod.id

  tags = {
    Name = "arianrod-private-1c"
  }
}

resource "aws_route" "private_1a" {
  destination_cidr_block = "0.0.0.0/0"
  route_table_id         = aws_route_table.private_1a.id
  nat_gateway_id         = aws_nat_gateway.nat_1a.id
}

resource "aws_route" "private_1c" {
  destination_cidr_block = "0.0.0.0/0"
  route_table_id         = aws_route_table.private_1c.id
  nat_gateway_id         = aws_nat_gateway.nat_1c.id
}


resource "aws_route_table_association" "private_1a" {
  subnet_id      = aws_subnet.private_1a.id
  route_table_id = aws_route_table.private_1a.id
}

resource "aws_route_table_association" "private_1c" {
  subnet_id      = aws_subnet.private_1c.id
  route_table_id = aws_route_table.private_1c.id
}
